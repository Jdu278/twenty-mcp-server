# Twenty MCP Server

An MCP server for integrating with Twenty CRM, providing comprehensive access to CRM functionality through categorized tools.

## Tool Filtering

This MCP server supports both category-based and individual tool filtering to allow users to selectively enable only the tools they need, reducing context window usage and improving performance.

### Available Categories

- `api-schema` - API Schema & Metadata
- `crm` - CRM & Contact Management  
- `tasks` - Task & Project Management
- `notes` - Notes & Documentation
- `attachments` - Attachments
- `calendar` - Calendar & Events
- `messaging` - Messaging & Communication
- `preferences` - User Preferences & Organization
- `views` - Data Views & Filtering
- `workflow` - Workflow & Automation
- `system` - System & Admin

### Usage

#### MCP Client Configuration

When configuring in an MCP client (like Claude Desktop), you can use category and/or specific tool arguments:

##### Using Categories
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

##### Using Specific Tools
```json
{
  "mcpServers": {
    "twenty": {
      "command": "node",
      "args": [
        "/path/to/twenty-mcp-server/build/index.js",
        "--tools=findManyAttachments,createOneAttachment,findManyCompanies"
      ],
      "env": {
        "TWENTY_BASE_URL": "https://your-twenty-instance.com/rest",
        "TWENTY_API_KEY": "your-api-key"
      }
    }
  }
}
```

##### Combining Categories and Specific Tools
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

**Default Behavior**: If neither `--category` nor `--tools` arguments are provided, all categories are enabled by default.