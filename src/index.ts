#!/usr/bin/env node
/**
 * Twenty MCP Server with Dynamic Tool Discovery
 *
 * This server:
 * 1. Fetches the OpenAPI spec from Twenty at startup
 * 2. Lists all available operations in the system instructions
 * 3. Exposes 2 tools: getTwentyToolSpec and executeTwentyApiCall
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest
} from "@modelcontextprotocol/sdk/types.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';
import { fetchOpenApiSpec, ToolCatalog, type CatalogEntry } from './openapi/index.js';
import { getInstructionsContent } from './instructions/instructions.js';

/**
 * Server configuration
 */
export const SERVER_NAME = "twenty-mcp-server";
export const SERVER_VERSION = "v0.3";
export const TWENTY_BASE_URL = process.env['TWENTY_BASE_URL'];
export const TWENTY_API_KEY = process.env['TWENTY_API_KEY'];

/**
 * Tool catalog - populated at startup
 */
let toolCatalog: ToolCatalog;

/**
 * Tool definitions for the two meta-tools
 */
const getTwentyToolSpecDefinition: Tool = {
  name: "getTwentyToolSpec",
  description: `Get the full specification for a Twenty CRM API operation.

Returns the complete input schema with all parameters, their types, and descriptions.
Use this BEFORE calling executeTwentyApiCall to understand what parameters are needed.

The list of available tools is in the system instructions above.`,
  inputSchema: {
    type: "object",
    properties: {
      toolName: {
        type: "string",
        description: "The exact tool name (e.g., 'findManyCompanies', 'createOnePerson'). See system instructions for available tools."
      }
    },
    required: ["toolName"]
  }
};

const executeTwentyApiCallDefinition: Tool = {
  name: "executeTwentyApiCall",
  description: `Execute a Twenty CRM API operation.

IMPORTANT: Use getTwentyToolSpec FIRST to get the required parameters for the tool.

The parameters object should match the inputSchema returned by getTwentyToolSpec.`,
  inputSchema: {
    type: "object",
    properties: {
      toolName: {
        type: "string",
        description: "The exact tool name (e.g., 'findManyCompanies', 'createOnePerson')"
      },
      parameters: {
        type: "object",
        description: "Parameters for the API call. Use getTwentyToolSpec to see required fields."
      }
    },
    required: ["toolName"]
  }
};

const listTwentyOperationsDefinition: Tool = {
  name: "listTwentyOperations",
  description: `**CALL THIS FIRST** - List all available Twenty CRM operations.

Returns the names and descriptions of all available API operations.
Call this before using getTwentyToolSpec or executeTwentyApiCall to know what operations exist.

Examples: findOneCompany, findManyPeople, createOneNote, etc.`,
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false
  }
};

/**
 * Handle listTwentyOperations calls
 */
function handleListTwentyOperations(): CallToolResult {
  const toolListing = toolCatalog.generateToolListing();
  return {
    content: [{
      type: "text",
      text: toolListing
    }]
  };
}

/**
 * Handle getTwentyToolSpec calls
 */
function handleGetToolSpec(args: Record<string, unknown> | undefined): CallToolResult {
  const toolName = args?.toolName;

  if (!toolName || typeof toolName !== 'string') {
    return {
      content: [{
        type: "text",
        text: "Error: 'toolName' parameter is required and must be a string"
      }]
    };
  }

  const tool = toolCatalog.get(toolName);

  if (!tool) {
    // List some available tools as suggestions
    const allTools = toolCatalog.getAllToolNames();
    const suggestions = allTools
      .filter(t => t.toLowerCase().includes(toolName.toLowerCase().replace(/\s+/g, '')))
      .slice(0, 5);

    const suggestionText = suggestions.length > 0
      ? `\n\nDid you mean one of these?\n${suggestions.map(s => `  - ${s}`).join('\n')}`
      : '\n\nCheck the system instructions for the list of available tools.';

    return {
      content: [{
        type: "text",
        text: `Error: Tool '${toolName}' not found.${suggestionText}`
      }]
    };
  }

  // Return the full tool specification
  const spec = {
    name: tool.name,
    description: tool.description,
    method: tool.method.toUpperCase(),
    path: tool.pathTemplate,
    inputSchema: tool.inputSchema
  };

  return {
    content: [{
      type: "text",
      text: `Tool specification for "${toolName}":\n\n${JSON.stringify(spec, null, 2)}\n\nUse executeTwentyApiCall with this tool name and parameters matching the inputSchema.`
    }]
  };
}

/**
 * Handle executeTwentyApiCall calls
 */
async function handleExecuteApiCall(args: Record<string, unknown> | undefined): Promise<CallToolResult> {
  const toolName = args?.toolName;
  const parameters = (args?.parameters as Record<string, unknown>) ?? {};

  if (!toolName || typeof toolName !== 'string') {
    return {
      content: [{
        type: "text",
        text: "Error: 'toolName' parameter is required and must be a string"
      }]
    };
  }

  // Look up the tool in the catalog
  const tool = toolCatalog.get(toolName);

  if (!tool) {
    return {
      content: [{
        type: "text",
        text: `Error: Tool '${toolName}' not found. Check the system instructions for available tools, or use getTwentyToolSpec to verify the tool name.`
      }]
    };
  }

  // Execute the API call
  return await executeApiTool(toolName, tool, parameters);
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
      const zodSchema = getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
      const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
      validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ')}`;
        return { content: [{ type: 'text', text: validationErrorMessage }] };
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

    // Return formatted response
    return {
      content: [
        {
          type: "text",
          text: `API Response (Status: ${response.status}):\n${responseText}`
        }
      ],
    };

  } catch (error: unknown) {
    // Handle errors during execution
    let errorMessage: string;

    // Format Axios errors specially
    if (axios.isAxiosError(error)) {
      errorMessage = formatApiError(error);
    }
    // Handle standard errors
    else if (error instanceof Error) {
      errorMessage = error.message;
    }
    // Handle unexpected error types
    else {
      errorMessage = 'Unexpected error: ' + String(error);
    }

    // Log error to stderr
    console.error(`Error during execution of tool '${toolName}':`, errorMessage);

    // Return error message to client
    return { content: [{ type: "text", text: errorMessage }] };
  }
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

    // Initialize the tool catalog
    toolCatalog = new ToolCatalog();
    toolCatalog.loadFromOpenApi(openApiSpec);

    console.error(`Tool catalog ready: ${toolCatalog.size} operations available`);

    // Build the dynamic instructions with tool listing
    const baseInstructions = getInstructionsContent();
    const toolListing = toolCatalog.generateToolListing();
    const fullInstructions = `${baseInstructions}\n\n${toolListing}`;

    // Create the MCP server with dynamic instructions
    const server = new Server(
      { name: SERVER_NAME, version: SERVER_VERSION },
      {
        capabilities: {
          tools: {}
        },
        instructions: fullInstructions
      }
    );

    // Register tool list handler
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          listTwentyOperationsDefinition,
          getTwentyToolSpecDefinition,
          executeTwentyApiCallDefinition
        ]
      };
    });

    // Register tool call handler
    server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
      const { name: toolName, arguments: toolArgs } = request.params;

      // Handle listTwentyOperations
      if (toolName === "listTwentyOperations") {
        return handleListTwentyOperations();
      }

      // Handle getTwentyToolSpec
      if (toolName === "getTwentyToolSpec") {
        return handleGetToolSpec(toolArgs);
      }

      // Handle executeTwentyApiCall
      if (toolName === "executeTwentyApiCall") {
        return handleExecuteApiCall(toolArgs);
      }

      // Unknown tool
      console.error(`Error: Unknown tool requested: ${toolName}`);
      return {
        content: [{
          type: "text",
          text: `Error: Unknown tool '${toolName}'. Available tools: listTwentyOperations, getTwentyToolSpec, executeTwentyApiCall`
        }]
      };
    });

    // Set up stdio transport and connect
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error(`${SERVER_NAME} (${SERVER_VERSION}) running on stdio`);
    console.error(`API: ${TWENTY_BASE_URL}`);
    console.error(`Tools exposed: listTwentyOperations, getTwentyToolSpec, executeTwentyApiCall`);

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
