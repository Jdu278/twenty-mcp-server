import { ToolDefinitionMap } from '../types/McpToolDefinition.js';

/**
 * API Schema-related tool definitions
 */
export const apiSchemaToolDefinitions: ToolDefinitionMap = new Map([
  ["GetOpenApiSchema", {
    name: "GetOpenApiSchema",
    description: `Get Open Api Schema`,
    inputSchema: {"type":"object","properties":{}},
    method: "get",
    pathTemplate: "/open-api/core",
    executionParameters: [],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }]
]);