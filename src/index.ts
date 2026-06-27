#!/usr/bin/env node
/**
 * Twenty MCP Server with Dynamic Tool Discovery
 *
 * This server:
 * 1. Fetches the OpenAPI spec from Twenty at startup
 * 2. Lists all available operations in the system instructions
 * 3. Exposes 3 tools: listTwentyOperations, getTwentyToolSpec, executeTwentyApiCall
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';
import { fetchOpenApiSpec, ToolCatalog, type CatalogEntry } from './openapi/index.js';
import { getInstructionsContent } from './instructions/instructions.js';
import { instructionsTool, handleInstructionsTool } from './instructions/instructionsTool.js';

/**
 * Server configuration
 */
export const SERVER_NAME = "twenty-mcp-server";
export const SERVER_VERSION = "0.4.0";
export const TWENTY_BASE_URL = process.env['TWENTY_BASE_URL'];
export const TWENTY_API_KEY = process.env['TWENTY_API_KEY'];

/**
 * Allowed HTTP methods (default: GET only for safety)
 * Set TWENTY_ALLOWED_METHODS=GET,POST,PUT,DELETE to enable more
 */
const VALID_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export const TWENTY_ALLOWED_METHODS = (process.env['TWENTY_ALLOWED_METHODS'] || 'GET')
  .toUpperCase()
  .split(',')
  .map(m => {
    const method = m.trim();
    if (!VALID_METHODS.includes(method)) {
      throw new Error(`Invalid HTTP method in TWENTY_ALLOWED_METHODS: "${method}". Valid: ${VALID_METHODS.join(', ')}`);
    }
    return method;
  });

/**
 * Whether to include tool discovery aids (tool listing in instructions + listTwentyOperations tool).
 * Set TWENTY_TOOL_DISCOVERY=false for clients with built-in tool search (e.g., Claude, ChatGPT).
 * Default: true (includes tool listing in instructions and exposes listTwentyOperations tool).
 */
export const TWENTY_TOOL_DISCOVERY = (process.env['TWENTY_TOOL_DISCOVERY'] ?? 'true').toLowerCase() !== 'false';

/**
 * Tool catalog and pre-computed Zod schemas - populated at startup
 */
let toolCatalog: ToolCatalog;
const zodSchemaCache = new Map<string, z.ZodTypeAny>();

function precomputeZodSchemas(): void {
  for (const [name, entry] of toolCatalog.entries()) {
    zodSchemaCache.set(name, getZodSchemaFromJsonSchema(entry.inputSchema, name));
  }
  console.error(`Pre-computed Zod schemas: ${zodSchemaCache.size}`);
}

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false
} as const;

/**
 * Handle getTwentyToolSpec calls - supports single or multiple tool names
 */
function handleGetToolSpec(toolNames: string[]) {
  const results: string[] = [];
  const errors: string[] = [];
  let allToolNames: string[] | undefined;

  for (const toolName of toolNames) {
    const tool = toolCatalog.get(toolName);

    if (!tool) {
      allToolNames ??= toolCatalog.getAllToolNames();
      const normalized = toolName.toLowerCase().replace(/\s+/g, '');
      const suggestions = allToolNames
        .filter(t => t.toLowerCase().includes(normalized))
        .slice(0, 5);

      const suggestionText = suggestions.length > 0
        ? ` Did you mean: ${suggestions.join(', ')}?`
        : '';

      errors.push(`Tool '${toolName}' not found.${suggestionText}`);
      continue;
    }

    const spec = {
      name: tool.name,
      description: tool.description,
      method: tool.method.toUpperCase(),
      path: tool.pathTemplate,
      inputSchema: tool.inputSchema
    };

    results.push(JSON.stringify(spec, null, 2));
  }

  const parts: string[] = [];
  if (results.length > 0) {
    parts.push(results.join('\n\n---\n\n'));
  }
  if (errors.length > 0) {
    parts.push(errors.join('\n'));
  }

  return {
    content: [{
      type: "text" as const,
      text: parts.join('\n\n')
    }]
  };
}

/**
 * Executes an API tool with the provided arguments
 */
async function executeApiTool(
  toolName: string,
  definition: CatalogEntry,
  toolArgs: Record<string, any>
): Promise<CallToolResult> {
  try {
    // Validate arguments against the input schema
    let validatedArgs: Record<string, any>;
    try {
      const zodSchema = zodSchemaCache.get(toolName) ?? getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
      const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
      validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ');
        const schemaHint = JSON.stringify(definition.inputSchema, null, 2);
        const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${validationErrors}\n\nExpected inputSchema:\n${schemaHint}`;
        return { content: [{ type: 'text', text: validationErrorMessage }], isError: true };
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Internal error during validation setup: ${errorMessage}` }] };
      }
    }

    // Prepare URL, query parameters, headers, and request body
    let urlPath = definition.pathTemplate;
    const queryParams: Record<string, any> = {};
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    let requestBodyData: any = undefined;

    // Apply parameters to the URL path, query, or headers
    definition.executionParameters.forEach((param) => {
      const value = validatedArgs[param.name];
      if (typeof value !== 'undefined' && value !== null) {
        if (param.in === 'path') {
          urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(String(value)));
        }
        else if (param.in === 'query') {
          queryParams[param.name] = value;
        }
        else if (param.in === 'header') {
          headers[param.name.toLowerCase()] = String(value);
        }
      }
    });

    // Ensure all path parameters are resolved
    if (urlPath.includes('{')) {
      throw new Error(`Failed to resolve path parameters: ${urlPath}`);
    }

    // Construct the full URL
    const requestUrl = TWENTY_BASE_URL ? `${TWENTY_BASE_URL}${urlPath}` : urlPath;

    // Handle request body if needed
    if (definition.requestBodyContentType && typeof validatedArgs['requestBody'] !== 'undefined') {
      requestBodyData = validatedArgs['requestBody'];
      headers['content-type'] = definition.requestBodyContentType;
    }

    // Apply security (Bearer token)
    if (TWENTY_API_KEY) {
      headers['authorization'] = `Bearer ${TWENTY_API_KEY}`;
    } else {
      console.warn(`Warning: No TWENTY_API_KEY set, API calls may fail`);
    }

    // Prepare the axios request configuration
    const config: AxiosRequestConfig = {
      method: definition.method.toUpperCase(),
      url: requestUrl,
      params: queryParams,
      headers: headers,
      ...(requestBodyData !== undefined && { data: requestBodyData }),
    };

    // Log request info to stderr (doesn't affect MCP output)
    console.error(`Executing tool "${toolName}": ${config.method} ${config.url}`);

    // Execute the request
    const response = await axios(config);

    // Format response based on content type and data
    const responseText = formatResponseText(response.data, response.status);

    return {
      content: [{
        type: "text",
        text: `API Response (Status: ${response.status}):\n${responseText}`
      }],
    };

  } catch (error: unknown) {
    let errorMessage: string;

    if (axios.isAxiosError(error)) {
      errorMessage = formatApiError(error);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'Unexpected error: ' + String(error);
    }

    console.error(`Error during execution of tool '${toolName}':`, errorMessage);
    return { content: [{ type: 'text', text: errorMessage }], isError: true };
  }
}

/**
 * Registers the usage instructions tool (always available)
 */
function registerInstructionsTool(server: McpServer) {
  server.registerTool(
    instructionsTool.name,
    {
      title: "Usage Instructions",
      description: instructionsTool.description,
      annotations: READ_ONLY_ANNOTATIONS
    },
    async () => handleInstructionsTool()
  );
}

/**
 * Registers meta-tools for tool discovery mode (TWENTY_TOOL_DISCOVERY=true).
 * Exposes listTwentyOperations, getTwentyToolSpec, and executeTwentyApiCall.
 */
function registerMetaTools(server: McpServer) {
  server.registerTool(
    "listTwentyOperations",
    {
      title: "List Operations",
      description: `List all available Twenty CRM operations.

Returns the names and descriptions of all available API operations.
Only call this if the available operations are not already listed in the system instructions.
If you already see the "Available Twenty API Operations" list in your instructions, you do NOT need to call this tool.`,
      annotations: READ_ONLY_ANNOTATIONS
    },
    async () => ({
      content: [{
        type: "text",
        text: toolCatalog.generateToolListing()
      }]
    })
  );

  server.registerTool(
    "getTwentyToolSpec",
    {
      title: "Get Tool Specification",
      description: `Get the full specification for one or more Twenty CRM API operations.

Returns the complete input schema with all parameters, their types, and descriptions.
Use this BEFORE calling executeTwentyApiCall to understand what parameters are needed.
Supports batch requests — pass multiple tool names to get all specs at once (e.g., for related workflows like createOneNote + createOneNoteTarget).

The list of available tools is in the system instructions above.`,
      inputSchema: {
        toolNames: z.array(z.string()).describe("One or more tool names (e.g., ['findManyCompanies'] or ['createOneNote', 'createOneNoteTarget'])")
      },
      annotations: READ_ONLY_ANNOTATIONS
    },
    async ({ toolNames }) => handleGetToolSpec(toolNames)
  );

  server.registerTool(
    "executeTwentyApiCall",
    {
      title: "Execute API Call",
      description: `Execute a Twenty CRM API operation.

IMPORTANT: Use getTwentyToolSpec FIRST to get the required parameters for the tool.

The parameters object should match the inputSchema returned by getTwentyToolSpec.`,
      inputSchema: {
        toolName: z.string().describe("The exact tool name (e.g., 'findManyCompanies', 'createOnePerson')"),
        parameters: z.record(z.unknown()).optional().describe("Parameters for the API call. Use getTwentyToolSpec to see required fields.")
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        openWorldHint: false
      }
    },
    async ({ toolName, parameters }) => {
      const tool = toolCatalog.get(toolName);
      if (!tool) {
        return {
          content: [{
            type: "text",
            text: `Error: Tool '${toolName}' not found. Check the system instructions for available tools, or use getTwentyToolSpec to verify the tool name.`
          }],
          isError: true
        };
      }
      return await executeApiTool(toolName, tool, parameters ?? {});
    }
  );
}

/**
 * Extracts a ZodRawShape from a pre-computed Zod schema for use with McpServer.registerTool.
 */
function getZodShape(toolName: string): z.ZodRawShape {
  const schema = zodSchemaCache.get(toolName);
  if (schema instanceof z.ZodObject) {
    return schema.shape as z.ZodRawShape;
  }
  return {};
}

/**
 * Registers each OpenAPI operation as its own native MCP tool (TWENTY_TOOL_DISCOVERY=false).
 * Converts JSON Schema → Zod at startup so we can use the high-level McpServer API consistently.
 */
function registerNativeTools(server: McpServer) {
  for (const [name, entry] of toolCatalog.entries()) {
    const method = entry.method.toLowerCase();

    server.registerTool(
      name,
      {
        title: entry.description,
        description: `${entry.method.toUpperCase()} ${entry.pathTemplate}\n\n${entry.description}`,
        inputSchema: getZodShape(name),
        annotations: {
          readOnlyHint: method === 'get',
          destructiveHint: method === 'delete',
          idempotentHint: method === 'get' || method === 'put' || method === 'delete',
          openWorldHint: false
        }
      },
      async (args) => executeApiTool(name, entry, args as Record<string, any>)
    );
  }

  console.error(`Native tools registered: ${toolCatalog.size}`);
}

/**
 * Main function to start the server
 */
async function main() {
  // Validate required environment variables
  if (!TWENTY_BASE_URL) {
    console.error("Error: TWENTY_BASE_URL environment variable is required");
    console.error("Set it to your Twenty API base URL, e.g., https://your-instance.com/rest");
    process.exit(1);
  }

  if (!TWENTY_API_KEY) {
    console.error("Error: TWENTY_API_KEY environment variable is required");
    console.error("Get an API key from your Twenty settings");
    process.exit(1);
  }

  try {
    // Fetch and load the OpenAPI spec
    console.error("Initializing Twenty MCP Server...");
    const openApiSpec = await fetchOpenApiSpec(TWENTY_BASE_URL, TWENTY_API_KEY);

    // Initialize the tool catalog with allowed methods
    toolCatalog = new ToolCatalog();
    toolCatalog.loadFromOpenApi(openApiSpec, TWENTY_ALLOWED_METHODS);

    console.error(`Tool catalog ready: ${toolCatalog.size} operations available`);

    // Build instructions — include tool listing only when discovery is enabled
    const baseInstructions = getInstructionsContent();
    const fullInstructions = TWENTY_TOOL_DISCOVERY
      ? `${baseInstructions}\n\n${toolCatalog.generateToolListing()}`
      : baseInstructions;

    console.error(`Tool discovery: ${TWENTY_TOOL_DISCOVERY ? 'enabled (tool listing in instructions)' : 'disabled (client handles tool search)'}`);

    // Create the MCP server with McpServer high-level API
    const server = new McpServer(
      { name: SERVER_NAME, version: SERVER_VERSION },
      { instructions: fullInstructions }
    );

    // Pre-compute Zod schemas for native tool registration and cached validation
    precomputeZodSchemas();

    // Register tools based on discovery mode
    registerInstructionsTool(server);

    if (TWENTY_TOOL_DISCOVERY) {
      registerMetaTools(server);
    } else {
      registerNativeTools(server);
    }

    // Set up stdio transport and connect
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error(`${SERVER_NAME} (${SERVER_VERSION}) running on stdio`);
    console.error(`API: ${TWENTY_BASE_URL}`);
    console.error(`Tools exposed: ${TWENTY_TOOL_DISCOVERY
      ? 'getUsageInstructions, listTwentyOperations, getTwentyToolSpec, executeTwentyApiCall'
      : `getUsageInstructions + ${toolCatalog.size} native API tools`}`);

  } catch (error) {
    console.error("Error during server startup:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
  console.error("Shutting down MCP server...");
  process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the server
main().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});

/**
 * Formats API errors for better readability
 */
function formatApiError(error: AxiosError): string {
  let message = 'API request failed.';
  if (error.response) {
    message = `API Error: Status ${error.response.status} (${error.response.statusText || 'Status text not available'}). `;
    const responseData = error.response.data;
    const MAX_LEN = 500;
    if (typeof responseData === 'string') {
      message += `Response: ${responseData.substring(0, MAX_LEN)}${responseData.length > MAX_LEN ? '...' : ''}`;
    }
    else if (responseData) {
      try {
        const jsonString = JSON.stringify(responseData);
        message += `Response: ${jsonString.substring(0, MAX_LEN)}${jsonString.length > MAX_LEN ? '...' : ''}`;
      } catch {
        message += 'Response: [Could not serialize data]';
      }
    }
    else {
      message += 'No response body received.';
    }
  } else if (error.request) {
    message = 'API Network Error: No response received from server.';
    if (error.code) message += ` (Code: ${error.code})`;
  } else {
    message += `API Request Setup Error: ${error.message}`;
  }
  return message;
}

/**
 * Formats API response data into a readable string
 */
function formatResponseText(data: unknown, status: number): string {
  if (data === undefined || data === null) {
    return `(Status: ${status} - No body content)`;
  }

  if (typeof data === 'string') {
    return data;
  }

  if (typeof data === 'object') {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return '[Stringify Error]';
    }
  }

  return String(data);
}

/**
 * Converts a JSON Schema to a Zod schema for runtime validation
 */
function getZodSchemaFromJsonSchema(jsonSchema: unknown, toolName: string): z.ZodTypeAny {
  if (typeof jsonSchema !== 'object' || jsonSchema === null) {
    return z.object({}).passthrough();
  }

  try {
    const zodSchemaString = jsonSchemaToZod(jsonSchema);
    const zodSchema = eval(zodSchemaString);

    if (typeof zodSchema?.parse !== 'function') {
      throw new Error('Eval did not produce a valid Zod schema.');
    }

    return zodSchema as z.ZodTypeAny;
  } catch (error) {
    console.error(`Failed to generate/evaluate Zod schema for '${toolName}':`, error);
    return z.object({}).passthrough();
  }
}
