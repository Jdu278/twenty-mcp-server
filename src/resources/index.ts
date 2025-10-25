import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Resource } from '@modelcontextprotocol/sdk/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Resource definitions for the Twenty MCP Server
 */
export const RESOURCES: Resource[] = [
  {
    uri: "twenty://best-practices",
    name: "Twenty CRM Best Practices",
    description: "REQUIRED READING: Critical usage guidelines and best practices for working with this Twenty CRM instance. Read this before using any tools to avoid common mistakes.",
    mimeType: "text/markdown",
    text: readFileSync(join(__dirname, 'best-practices.md'), 'utf-8'),
    annotations: {
      audience: ["assistant"],
      priority: 1
    }
  }
];

