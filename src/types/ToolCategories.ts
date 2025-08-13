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
