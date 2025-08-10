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
 * Build combined tool definition map based on enabled categories
 */
export function buildToolDefinitionMap(enabledCategories: Set<CategoryKey>): ToolDefinitionMap {
  const combinedMap: ToolDefinitionMap = new Map();
  
  for (const category of enabledCategories) {
    const categoryMap = categoryToolMaps[category];
    if (categoryMap) {
      for (const [toolName, toolDef] of categoryMap) {
        combinedMap.set(toolName, toolDef);
      }
    }
  }
  
  return combinedMap;
}

/**
 * Parse command line arguments for category filtering
 */
export function parseArgs(): { enabledCategories: Set<CategoryKey> } {
  const args = process.argv.slice(2);
  const enabledCategories = new Set<CategoryKey>();
  
  // Default to all categories if no specific categories are requested
  let hasSpecificCategories = false;
  
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
    }
  }
  
  // If no specific categories requested, enable all
  if (!hasSpecificCategories) {
    Object.keys(TOOL_CATEGORIES).forEach(cat => {
      enabledCategories.add(cat as CategoryKey);
    });
  }
  
  return { enabledCategories };
}