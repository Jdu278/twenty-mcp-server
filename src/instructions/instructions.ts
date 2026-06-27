import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * "How to use" preamble for tool-discovery mode (TWENTY_TOOL_DISCOVERY=true).
 * The server exposes a handful of meta-tools instead of one tool per operation.
 */
const DISCOVERY_HOWTO = `# Twenty CRM MCP Server - Usage Guide

## How to Use This Server

This server exposes your Twenty CRM through a few meta-tools:

- **getUsageInstructions** — these guidelines. Call once at the start.
- **listTwentyOperations** — list every available operation. Only needed if the operation list isn't already in your system instructions.
- **getTwentyToolSpec** — get the full input schema for one or more operations. Pass an array of names; batch related operations in a single call.
- **executeTwentyApiCall** — run an operation with its parameters.

**Workflow:**
1. Inspect parameters first: \`getTwentyToolSpec({ toolNames: ["createOneCompany"] })\`. Batch related operations, e.g. \`getTwentyToolSpec({ toolNames: ["createOneNote", "createOneNoteTarget"] })\`.
2. Execute: \`executeTwentyApiCall({ toolName: "createOneCompany", parameters: { requestBody: { name: "Acme Corp" } } })\`.
`;

/**
 * "How to use" preamble for native-tool mode (TWENTY_TOOL_DISCOVERY=false).
 * Each operation is registered as its own MCP tool, so there are no meta-tools.
 */
const NATIVE_HOWTO = `# Twenty CRM MCP Server - Usage Guide

## How to Use This Server

Each Twenty CRM operation is exposed as its own tool (e.g. \`createOneCompany\`, \`findManyPeople\`, \`createOneNote\`). Use your client's tool search to find the right operation, then call it directly with its parameters.

Example: \`createOneCompany({ requestBody: { name: "Acme Corp" } })\`
`;

/**
 * Get the instructions content for server system instructions.
 *
 * @param toolDiscovery Whether tool-discovery mode is active. Selects the
 *   matching "how to use" preamble; the best-practices body is shared.
 */
export function getInstructionsContent(toolDiscovery = true): string {
  try {
    // When running from build/, this resolves to build/instructions/instructions.md
    const instructionsPath = join(__dirname, 'instructions.md');
    const bestPractices = readFileSync(instructionsPath, 'utf-8');
    const howto = toolDiscovery ? DISCOVERY_HOWTO : NATIVE_HOWTO;
    return `${howto}\n\n${bestPractices}`;
  } catch (error) {
    throw new Error(`Failed to load instructions: ${error instanceof Error ? error.message : String(error)}`);
  }
}
