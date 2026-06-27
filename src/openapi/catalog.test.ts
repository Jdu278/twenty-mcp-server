import { ToolCatalog } from './catalog.js';
import type { OpenAPISpec } from './fetcher.js';

/**
 * A small but representative spec exercising the transformations that actually
 * matter: method filtering, operationId fallback naming, $ref / allOf / array
 * resolution, required-field collection, and request-body handling.
 */
function makeSpec(): OpenAPISpec {
  return {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1' },
    paths: {
      '/companies': {
        get: {
          operationId: 'findManyCompanies',
          summary: 'List companies',
          tags: ['Companies'],
          parameters: [
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
            { name: 'filter', in: 'query' }, // no schema -> defaults to string
          ],
        },
        post: {
          operationId: 'createOneCompany',
          summary: 'Create a company',
          tags: ['Companies'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Company' } } },
          },
        },
      },
      '/companies/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        get: {
          // no operationId -> name is generated from method + path
          summary: 'Get a company',
          tags: ['Companies'],
        },
      },
    },
    components: {
      schemas: {
        Company: {
          allOf: [
            { type: 'object', properties: { name: { type: 'string' } } },
            { type: 'object', properties: { tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } } } },
          ],
        },
        Tag: { type: 'object', properties: { label: { type: 'string' } } },
      },
    },
  };
}

describe('ToolCatalog.loadFromOpenApi', () => {
  it('includes only operations whose method is allowed', () => {
    const catalog = new ToolCatalog();
    catalog.loadFromOpenApi(makeSpec(), ['GET']);

    expect(catalog.get('findManyCompanies')).toBeDefined();
    expect(catalog.get('createOneCompany')).toBeUndefined(); // POST filtered out
    expect(catalog.size).toBe(2); // both GETs
  });

  it('is case-insensitive about allowed methods and can enable writes', () => {
    const catalog = new ToolCatalog();
    catalog.loadFromOpenApi(makeSpec(), ['get', 'post']);

    expect(catalog.get('createOneCompany')).toBeDefined();
    expect(catalog.size).toBe(3);
  });

  it('falls back to a generated name when operationId is missing', () => {
    const catalog = new ToolCatalog();
    catalog.loadFromOpenApi(makeSpec(), ['GET']);

    // path params are collapsed to "id" in the fallback name
    expect(catalog.get('get_companies_id')).toBeDefined();
    expect(catalog.get('get_companies_id')?.description).toBe('Get a company');
  });

  it('merges path-level and operation-level parameters and marks required ones', () => {
    const catalog = new ToolCatalog();
    catalog.loadFromOpenApi(makeSpec(), ['GET']);

    const list = catalog.get('findManyCompanies')!.inputSchema as any;
    expect(Object.keys(list.properties)).toEqual(['limit', 'filter']);
    expect(list.properties.limit.type).toBe('integer');
    expect(list.properties.filter.type).toBe('string'); // defaulted
    expect(list.required).toBeUndefined(); // no required params

    const byId = catalog.get('get_companies_id')!.inputSchema as any;
    expect(byId.properties.id).toBeDefined();
    expect(byId.required).toEqual(['id']); // path param is required
  });

  it('resolves $ref, allOf, and array-item refs in the request body', () => {
    const catalog = new ToolCatalog();
    catalog.loadFromOpenApi(makeSpec(), ['POST']);

    const entry = catalog.get('createOneCompany')!;
    expect(entry.requestBodyContentType).toBe('application/json');

    const schema = entry.inputSchema as any;
    expect(schema.required).toEqual(['requestBody']);

    const body = schema.properties.requestBody;
    // allOf branches merged into a single object
    expect(body.properties.name.type).toBe('string');
    expect(body.properties.tags.type).toBe('array');
    // nested $ref inside array items is resolved, not left as a $ref
    expect(body.properties.tags.items.properties.label.type).toBe('string');
    expect(JSON.stringify(body)).not.toContain('$ref');
  });
});

describe('ToolCatalog.generateToolListing', () => {
  it('groups by tag, tags the method, and truncates long descriptions', () => {
    const longDesc = 'x'.repeat(80);
    const spec: OpenAPISpec = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1' },
      paths: {
        '/people': {
          get: { operationId: 'findManyPeople', summary: longDesc, tags: ['People'] },
        },
      },
    };
    const catalog = new ToolCatalog();
    catalog.loadFromOpenApi(spec, ['GET']);

    const listing = catalog.generateToolListing();
    expect(listing).toContain('### People');
    expect(listing).toContain('**findManyPeople** [GET]:');
    expect(listing).toContain('x'.repeat(57) + '...'); // 60-char cap (57 + ellipsis)
    expect(listing).not.toContain('x'.repeat(80));
  });

  it('rebuilds the cached listing after a reload', () => {
    const catalog = new ToolCatalog();
    catalog.loadFromOpenApi(makeSpec(), ['GET']);
    expect(catalog.generateToolListing()).toContain('findManyCompanies');

    // reloading with a different spec must invalidate the cached listing
    const other: OpenAPISpec = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1' },
      paths: { '/notes': { get: { operationId: 'findManyNotes', summary: 'Notes', tags: ['Notes'] } } },
    };
    catalog.loadFromOpenApi(other, ['GET']);

    const listing = catalog.generateToolListing();
    expect(listing).toContain('findManyNotes');
    expect(listing).not.toContain('findManyCompanies');
  });
});
