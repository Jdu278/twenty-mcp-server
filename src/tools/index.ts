import { ToolDefinitionMap } from './McpToolDefinition.js';
import { apiSchemaToolDefinitions } from './api-schema.js';
import { crmToolDefinitions } from './crm.js';
import { tasksToolDefinitions } from './tasks.js';
import { notesToolDefinitions } from './notes.js';
import { calendarToolDefinitions } from './calendar.js';
import { messagingToolDefinitions } from './messaging.js';
import { preferencesToolDefinitions } from './preferences.js';
import { viewsToolDefinitions } from './views.js';
import { workflowToolDefinitions } from './workflow.js';
import { systemToolDefinitions } from './system.js';
import { attachmentsToolDefinitions } from './attachments.js';

/**
 * Available tool categories
 */
export const TOOL_CATEGORIES = {
  'api-schema': 'API Schema & Metadata',
  'crm': 'CRM & Contact Management', 
  'tasks': 'Task & Project Management',
  'notes': 'Notes & Documentation',
  'attachments': 'Attachments',
  'calendar': 'Calendar & Events',
  'messaging': 'Messaging & Communication',
  'preferences': 'User Preferences & Organization',
  'views': 'Data Views & Filtering',
  'workflow': 'Workflow & Automation',
  'system': 'System & Admin'
} as const;

export type CategoryKey = keyof typeof TOOL_CATEGORIES;

/**
 * Map of category keys to their tool definition maps
 */
const categoryToolMaps: Record<CategoryKey, ToolDefinitionMap> = {
  'api-schema': apiSchemaToolDefinitions,
  'crm': crmToolDefinitions,
  'tasks': tasksToolDefinitions,
  'notes': notesToolDefinitions,
  'attachments': attachmentsToolDefinitions,
  'calendar': calendarToolDefinitions,
  'messaging': messagingToolDefinitions,
  'preferences': preferencesToolDefinitions,
  'views': viewsToolDefinitions,
  'workflow': workflowToolDefinitions,
  'system': systemToolDefinitions
};

/**
 * Build combined tool definition map based on enabled categories and specific tools
 */
export function buildToolDefinitionMap(enabledCategories: Set<CategoryKey>, specificTools?: Set<string>): ToolDefinitionMap {
  const combinedMap: ToolDefinitionMap = new Map();
  
  // Add tools from enabled categories
  for (const category of enabledCategories) {
    const categoryMap = categoryToolMaps[category];
    if (categoryMap) {
      for (const [toolName, toolDef] of categoryMap) {
        combinedMap.set(toolName, toolDef);
      }
    }
  }
  
  // Add specific tools if provided
  if (specificTools && specificTools.size > 0) {
    // Search through all category maps for the specific tools
    for (const toolName of specificTools) {
      let foundTool = false;
      for (const categoryMap of Object.values(categoryToolMaps)) {
        const toolDef = categoryMap.get(toolName);
        if (toolDef) {
          combinedMap.set(toolName, toolDef);
          foundTool = true;
          break;
        }
      }
      if (!foundTool) {
        console.error(`Warning: Requested tool '${toolName}' not found in any category`);
      }
    }
  }
  
  return combinedMap;
}

/**
 * Parse command line arguments for category and tool filtering
 */
export function parseArgs(): { enabledCategories: Set<CategoryKey>, specificTools: Set<string> } {
  const args = process.argv.slice(2);
  const enabledCategories = new Set<CategoryKey>();
  const specificTools = new Set<string>();
  
  // Default to all categories if no specific categories or tools are requested
  let hasSpecificCategories = false;
  let hasSpecificTools = false;
  
  for (const arg of args) {
    if (arg.startsWith('--category=')) {
      const categories = arg.split('=')[1].split(',');
      categories.forEach(cat => {
        const trimmedCat = cat.trim() as CategoryKey;
        if (trimmedCat in TOOL_CATEGORIES) {
          enabledCategories.add(trimmedCat);
          hasSpecificCategories = true;
        }
      });
    } else if (arg.startsWith('--tools=')) {
      const tools = arg.split('=')[1].split(',');
      tools.forEach(tool => {
        const trimmedTool = tool.trim();
        if (trimmedTool) {
          specificTools.add(trimmedTool);
          hasSpecificTools = true;
        }
      });
    }
  }
  
  // If no specific categories or tools requested, enable all categories
  if (!hasSpecificCategories && !hasSpecificTools) {
    Object.keys(TOOL_CATEGORIES).forEach(cat => {
      enabledCategories.add(cat as CategoryKey);
    });
  }
  
  return { enabledCategories, specificTools };
}