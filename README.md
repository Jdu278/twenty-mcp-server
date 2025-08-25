# Twenty MCP Server

An MCP server for integrating with [Twenty CRM](https://github.com/twentyhq/twenty), providing access to Twenty's REST API through categorized tools. The available tools map the entire Twenty REST API and were automatically generated using the [openapi-mcp-generator](https://github.com/harsha-iiiv/openapi-mcp-generator).

> [!CAUTION]
> **Development Version**  
> This server is currently in development and is **not recommended for production use**. Use at your own risk in production environments.

> [!CAUTION]
> **For local use**  
> This MCP server provides access to your Twenty CRM API using your api-key. It has **no built-in authorization, authentication, or access controls**.

## Tool Filtering

This MCP server supports both **category-based** and **individual tool filtering**, allowing you to selectively enable only the tools you need. This approach significantly reduces context window usage and improves performance.

### Available Categories

| Category | Description |
|----------|-------------|
| `api-schema` | API Schema & Metadata |
| `crm` | CRM & Contact Management |
| `tasks` | Task & Project Management |
| `notes` | Notes & Documentation |
| `attachments` | File Attachments |
| `calendar` | Calendar & Events |
| `messaging` | Messaging & Communication |
| `preferences` | User Preferences & Organization |
| `views` | Data Views & Filtering |
| `workflow` | Workflow & Automation |
| `system` | System & Admin |

### Available Tools

All available tools can be found in the Twenty REST API schema at `https://your-twenty-instance.com/rest` under the `operationId` field. You can either:

- Download the OpenAPI specification from your Twenty instance, or
- Browse tool definitions directly in this repository under the `/src/tools/` directory

## Usage

### MCP Client Configuration

When configuring this server in an MCP client (like Claude Desktop), you can use category and/or specific tool arguments to control which tools are available.

> [!TIP]
> **Performance Recommendation**  
> It's highly recommended to limit the available tools to only what you need. This reduces the context window size required to display available tools, improving both performance and cost efficiency.

> [!NOTE]
> The tools defined in the "Using Specific Tools" example below represent my currently used tool setup. 

#### Using Categories

Filter tools by predefined categories:
```json
{
  "mcpServers": {
    "twenty": {
      "command": "node",
      "args": [
        "/path/to/twenty-mcp-server/build/index.js",
        "--category=crm,tasks,notes"
      ],
      "env": {
        "TWENTY_BASE_URL": "https://your-twenty-instance.com/rest",
        "TWENTY_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### Using Specific Tools

Select individual tools by their names:
```json
{
  "mcpServers": {
    "twenty": {
      "command": "node",
      "args": [
        "/path/to/twenty-mcp-server/build/index.js",
        "--tools=findManyCompanies,createOneCompany,findOneCompany,UpdateOneCompany,findManyPeople,createOnePerson,findOnePerson,UpdateOnePerson,findManyTasks,createOneTask,createManyTasks,findOneTask,UpdateOneTask"
      ],
      "env": {
        "TWENTY_BASE_URL": "https://your-twenty-instance.com/rest",
        "TWENTY_API_KEY": "your-api-key"
      }
    }
  }
}
```

#### Combining Categories and Specific Tools

Use both approaches together:
```json
{
  "mcpServers": {
    "twenty": {
      "command": "node",
      "args": [
        "/path/to/twenty-mcp-server/build/index.js",
        "--category=crm,tasks",
        "--tools=findManyAttachments,createOneAttachment"
      ],
      "env": {
        "TWENTY_BASE_URL": "https://your-twenty-instance.com/rest",
        "TWENTY_API_KEY": "your-api-key"
      }
    }
  }
}
```

---

### Default Behavior

> [!NOTE]
> **Default Configuration**  
> If neither `--category` nor `--tools` arguments are provided, **all categories are enabled by default**. This gives you access to the complete Twenty API but will impact performance and costs due to the large number of available tools.

[![MCP Badge](https://lobehub.com/badge/mcp/jdu278-twenty-mcp-server)](https://lobehub.com/mcp/jdu278-twenty-mcp-server)
