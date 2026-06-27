import { type Tool, type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { getInstructionsContent } from './instructions.js';

/**
 * Tool definition for getting usage instructions
 */
export const instructionsTool: Tool = {
  name: "getUsageInstructions",
  description: "**CALL THIS FIRST** - Get critical usage guidelines and best practices for this Twenty CRM instance. Contains important workflow requirements (e.g., linking notes to entities), formatting guidelines, and search tips that will help you use the tools correctly. Call this only once at the beginning.",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false
  }
};

/**
 * Handler for the instructions tool
 */
export function handleInstructionsTool(toolDiscovery = true): CallToolResult {
  return {
    content: [{
      type: "text",
      text: getInstructionsContent(toolDiscovery)
    }]
  };
}
