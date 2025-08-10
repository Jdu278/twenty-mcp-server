# Twenty MCP Server

An MCP server for integrating with Twenty CRM, providing comprehensive access to CRM functionality through categorized tools.

## Category-Based Tool Filtering

This MCP server supports category-based filtering to allow users to selectively enable only the tool categories they need, reducing context window usage and improving performance.

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

When configuring in an MCP client (like Claude Desktop), add the category arguments:

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

If no `--category` argument is provided, all categories are enabled by default.