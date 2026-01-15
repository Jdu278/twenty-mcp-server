import type { OpenAPISpec, Operation, Parameter, RequestBody } from './fetcher.js';

export interface CatalogEntry {
  name: string;
  description: string;
  inputSchema: object;
  method: string;
  pathTemplate: string;
  executionParameters: Array<{ name: string; in: string }>;
  requestBodyContentType?: string;
  securityRequirements: any[];
  tags: string[];
}

export class ToolCatalog {
  private tools = new Map<string, CatalogEntry>();

  loadFromOpenApi(spec: OpenAPISpec): void {
    this.tools.clear();
    const globalSecurity = spec.security || [];

    for (const [path, pathItem] of Object.entries(spec.paths)) {
      const pathParams = (pathItem.parameters || []).map(p => this.resolveParameter(p, spec.components));

      // Process each HTTP method
      for (const [method, operation] of Object.entries(pathItem)) {
        if (!operation || method === 'parameters') continue;

        const op = operation as Operation;
        const opParams = (op.parameters || []).map(p => this.resolveParameter(p, spec.components));
        const allParams = [...pathParams, ...opParams];

        const entry: CatalogEntry = {
          name: op.operationId || `${method}_${path.slice(1).replace(/\{[^}]+\}/g, 'id').replace(/\//g, '_')}`,
          description: op.summary || op.description || `${method.toUpperCase()} ${path}`,
          inputSchema: this.buildInputSchema(allParams, op.requestBody, spec.components),
          method,
          pathTemplate: path,
          executionParameters: allParams.map(p => ({ name: p.name, in: p.in })),
          requestBodyContentType: op.requestBody?.content ? Object.keys(op.requestBody.content)[0] : undefined,
          securityRequirements: op.security || globalSecurity,
          tags: op.tags || []
        };

        this.tools.set(entry.name, entry);
      }
    }

    console.error(`Loaded ${this.tools.size} tools from OpenAPI spec`);
  }

  private buildInputSchema(
    params: Parameter[],
    requestBody?: RequestBody,
    components?: OpenAPISpec['components']
  ): object {
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    for (const param of params) {
      const resolvedSchema = this.resolveSchema(param.schema, components) ?? { type: 'string' };
      properties[param.name] = { ...resolvedSchema, description: param.description };

      if (param.required) {
        required.push(param.name);
      }
    }

    if (requestBody?.content) {
      const contentSchema = Object.values(requestBody.content)[0]?.schema;
      if (contentSchema) {
        const resolvedBody = this.resolveSchema(contentSchema, components);
        properties['requestBody'] = {
          ...resolvedBody,
          description: requestBody.description ?? 'Request body'
        };

        if (requestBody.required) {
          required.push('requestBody');
        }
      }
    }

    const baseSchema = { type: 'object', properties };
    return required.length > 0 ? { ...baseSchema, required } : baseSchema;
  }

  private resolveParameter(param: any, components?: OpenAPISpec['components']): Parameter {
    if (param.$ref) {
      const refName = param.$ref.replace('#/components/parameters/', '');
      const resolved = components?.parameters?.[refName];
      if (resolved) {
        return this.resolveParameter(resolved, components);
      }
      console.error(`Warning: Could not resolve parameter reference: ${param.$ref}`);
      return { name: 'unknown', in: 'query' };
    }
    return param as Parameter;
  }

  private resolveSchema(schema: any, components?: OpenAPISpec['components']): any {
    if (!schema) return undefined;

    if (schema.$ref) {
      const resolved = components?.schemas?.[schema.$ref.replace('#/components/schemas/', '')];
      return resolved ? this.resolveSchema(resolved, components) : { type: 'object' };
    }

    if (schema.type === 'array' && schema.items) {
      return { ...schema, items: this.resolveSchema(schema.items, components) };
    }

    if (schema.type === 'object' && schema.properties) {
      const props: Record<string, any> = {};
      for (const [k, v] of Object.entries(schema.properties)) {
        props[k] = this.resolveSchema(v, components);
      }
      return { ...schema, properties: props };
    }

    if (schema.allOf) {
      return schema.allOf.reduce((acc: any, s: any) => {
        const resolved = this.resolveSchema(s, components);
        return { ...acc, ...resolved, properties: { ...acc.properties, ...resolved?.properties } };
      }, { type: 'object', properties: {} });
    }

    return schema;
  }

  get(name: string): CatalogEntry | undefined {
    return this.tools.get(name);
  }

  getAllToolNames(): string[] {
    return [...this.tools.keys()];
  }

  get size(): number {
    return this.tools.size;
  }

  generateToolListing(): string {
    const MAX_DESCRIPTION_LENGTH = 60;
    const groupedTools = new Map<string, Array<{ name: string; description: string }>>();

    for (const [name, entry] of this.tools) {
      const groupName = entry.tags[0] ?? entry.pathTemplate.split('/')[1] ?? 'Other';

      if (!groupedTools.has(groupName)) {
        groupedTools.set(groupName, []);
      }

      const description = entry.description.length > MAX_DESCRIPTION_LENGTH
        ? entry.description.slice(0, MAX_DESCRIPTION_LENGTH - 3) + '...'
        : entry.description;

      groupedTools.get(groupName)!.push({ name, description });
    }

    const lines = [
      '## Available Twenty API Operations',
      '',
      'Use `getTwentyToolSpec` to get the full specification for any tool.',
      'Use `executeTwentyApiCall` to execute a tool.',
      ''
    ];

    const sortedGroups = [...groupedTools.keys()].sort();
    for (const groupName of sortedGroups) {
      lines.push(`### ${groupName}`);

      for (const tool of groupedTools.get(groupName)!) {
        lines.push(`- **${tool.name}**: ${tool.description}`);
      }

      lines.push('');
    }

    return lines.join('\n');
  }
}
