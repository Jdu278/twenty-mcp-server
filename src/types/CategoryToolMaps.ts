import { CategoryKey } from './ToolCategories.js';
import { ToolDefinitionMap } from './McpToolDefinition.js';
import { apiSchemaToolDefinitions } from '../tools/api-schema.js';
import { workflowToolDefinitions } from '../tools/workflow.js';
import { crmToolDefinitions } from '../tools/crm.js';
import { tasksToolDefinitions } from '../tools/tasks.js';
import { notesToolDefinitions } from '../tools/notes.js';
import { attachmentsToolDefinitions } from '../tools/attachments.js';
import { calendarToolDefinitions } from '../tools/calendar.js';
import { messagingToolDefinitions } from '../tools/messaging.js';
import { preferencesToolDefinitions } from '../tools/preferences.js';
import { viewsToolDefinitions } from '../tools/views.js';
import { systemToolDefinitions } from '../tools/system.js';

/**
 * Map of category keys to their tool definition maps
 */
export const categoryToolMaps: Record<CategoryKey, ToolDefinitionMap> = {
  'api-schema': apiSchemaToolDefinitions,
  'workflow': workflowToolDefinitions,
  'crm': crmToolDefinitions,
  'tasks': tasksToolDefinitions,
  'notes': notesToolDefinitions,
  'attachments': attachmentsToolDefinitions,
  'calendar': calendarToolDefinitions,
  'messaging': messagingToolDefinitions,
  'preferences': preferencesToolDefinitions,
  'views': viewsToolDefinitions,
  'system': systemToolDefinitions
};
