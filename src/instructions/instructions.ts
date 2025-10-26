import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the instructions content for server
 */
export function getInstructionsContent(): string {
  try {
    // Go up one level from tools/ to src/, then into instructions/
    const instructionsPath = join(__dirname, '..', 'instructions', 'instructions.md');
    return readFileSync(instructionsPath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to load instructions: ${error instanceof Error ? error.message : String(error)}`);
  }
}
