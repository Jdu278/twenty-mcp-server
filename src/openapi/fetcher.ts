import axios from 'axios';

/**
 * OpenAPI 3.1 specification types (simplified)
 */
export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers?: Array<{ url: string; description?: string }>;
  paths: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, any>;
    parameters?: Record<string, any>;
    responses?: Record<string, any>;
    securitySchemes?: Record<string, any>;
  };
  security?: Array<Record<string, string[]>>;
  tags?: Array<{ name: string; description?: string }>;
}

export interface PathItem {
  get?: Operation;
  post?: Operation;
  put?: Operation;
  delete?: Operation;
  patch?: Operation;
  options?: Operation;
  head?: Operation;
  trace?: Operation;
  parameters?: Parameter[];
}

export interface Operation {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses?: Record<string, any>;
  security?: Array<Record<string, string[]>>;
}

export interface Parameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  description?: string;
  required?: boolean;
  schema?: any;
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content?: Record<string, { schema?: any }>;
}

/**
 * Fetches the OpenAPI specification from Twenty's API
 *
 * @param baseUrl - The base URL of the Twenty API (e.g., https://crm.kipotsdam.de/rest)
 * @param apiKey - The API key for authentication
 * @returns The parsed OpenAPI specification
 * @throws Error if the fetch fails
 */
export async function fetchOpenApiSpec(baseUrl: string, apiKey: string): Promise<OpenAPISpec> {
  const url = `${baseUrl}/open-api/core`;

  console.error(`Fetching OpenAPI spec from ${url}...`);

  try {
    const response = await axios.get<OpenAPISpec>(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    if (!response.data || !response.data.openapi || !response.data.paths) {
      throw new Error('Invalid OpenAPI spec: missing required fields (openapi, paths)');
    }

    const pathCount = Object.keys(response.data.paths).length;
    console.error(`Successfully fetched OpenAPI spec: ${pathCount} paths`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Failed to fetch OpenAPI spec: ${error.response.status} ${error.response.statusText}`
        );
      } else if (error.request) {
        throw new Error(
          `Failed to fetch OpenAPI spec: No response from server (${error.code || 'UNKNOWN'})`
        );
      }
    }
    throw new Error(`Failed to fetch OpenAPI spec: ${error instanceof Error ? error.message : String(error)}`);
  }
}
