# Twenty MCP Server

An MCP server for integrating with [Twenty CRM](https://github.com/twentyhq/twenty), providing dynamic access to Twenty's REST API.

## Key Features

- **Dynamic API Discovery**: Fetches the OpenAPI spec from your Twenty instance at startup, so the server always reflects your current data model (including custom objects)
- **System Prompt Integration**: All available operations are listed in the system instructions, so the AI knows exactly what's available
- **Two-Step Execution**: AI gets tool spec first, then executes - ensuring correct parameter usage
- **Minimal Context Usage**: Only 2 tools exposed, with operation details fetched on-demand

## How It Works

The server:
1. **Fetches OpenAPI spec** from your Twenty instance at startup
2. **Generates a tool listing** that gets included in the system instructions
3. **Exposes 2 tools**:
   - `getTwentyToolSpec` - Get full parameter specification for a tool
   - `executeTwentyApiCall` - Execute the tool with parameters

When the AI needs to interact with Twenty:
1. It sees all available operations in the system instructions
2. Calls `getTwentyToolSpec` to get the parameter schema
3. Calls `executeTwentyApiCall` with the correct parameters

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/twenty-mcp-server.git
cd twenty-mcp-server

# Install dependencies
npm install

# Build
npm run build
```

## Configuration

The server requires two environment variables:

| Variable | Description |
|----------|-------------|
| `TWENTY_BASE_URL` | Your Twenty API base URL (e.g., `https://your-instance.com/rest`) |
| `TWENTY_API_KEY` | Your Twenty API key |

### MCP Client Configuration

Example for Claude Desktop:

```json
{
  "mcpServers": {
    "twenty": {
      "command": "node",
      "args": ["/path/to/twenty-mcp-server/build/index.js"],
      "env": {
        "TWENTY_BASE_URL": "https://your-twenty-instance.com/rest",
        "TWENTY_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Usage Examples

### Example: Creating a Company

**User**: "Create a new company called Acme Corp"

**AI** (using the MCP tools):
1. Sees `createOneCompany` in system instructions
2. Calls `getTwentyToolSpec` with `toolName: "createOneCompany"`
3. Gets back the input schema showing `requestBody.name` is needed
4. Calls `executeTwentyApiCall` with:
   ```json
   {
     "toolName": "createOneCompany",
     "parameters": {
       "requestBody": {
         "name": "Acme Corp"
       }
     }
   }
   ```

### Example: Finding People

**User**: "Show me all people"

**AI**:
1. Sees `findManyPeople` in system instructions
2. Calls `getTwentyToolSpec` to understand filtering options
3. Calls `executeTwentyApiCall` with appropriate parameters

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        MCP Server                                │
│                                                                  │
│  System Instructions contain:                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ - findManyCompanies: List companies                      │    │
│  │ - createOneCompany: Create a company                     │    │
│  │ - findManyPeople: List people                            │    │
│  │ - ... (200+ operations)                                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Tools:                                                          │
│  ┌──────────────────┐    ┌─────────────────────────────────┐   │
│  │getTwentyToolSpec │───▶│  Returns full inputSchema for   │   │
│  └──────────────────┘    │  the specified tool              │   │
│                          └─────────────────────────────────┘   │
│  ┌──────────────────┐                                           │
│  │executeTwentyApiCall│──▶ Twenty REST API                     │
│  └──────────────────┘                                           │
└─────────────────────────────────────────────────────────────────┘
```

## Available Operations

The server dynamically loads all operations from your Twenty instance. Common operations include:

| Resource | Operations |
|----------|------------|
| Companies | findMany, createOne, findOne, updateOne, deleteOne, findDuplicates |
| People | findMany, createOne, findOne, updateOne, deleteOne, findDuplicates |
| Opportunities | findMany, createOne, findOne, updateOne, deleteOne |
| Tasks | findMany, createOne, findOne, updateOne, deleteOne |
| Notes | findMany, createOne, findOne, updateOne, deleteOne |
| And more... | Workflows, Views, Messages, Calendar, Attachments, etc. |

> **Note**: Custom objects you've created in Twenty will also appear in the tool listing.

## Customizing Instructions

The server includes base instructions in `src/instructions/instructions.md`. You can customize these to add instance-specific guidance (e.g., "Always link notes to companies using noteTargets").

## Development

```bash
# Build
npm run build

# Run built version
npm start
```

---

> **Warning**: This MCP server is in development. It provides access to your Twenty CRM API using your API key. No additional authorization controls beyond what Twenty provides.

[![MCP Badge](https://lobehub.com/badge/mcp/jdu278-twenty-mcp-server)](https://lobehub.com/mcp/jdu278-twenty-mcp-server)
