# Twenty CRM MCP Server - Usage Guide

## How to Use This Server

This server provides access to Twenty CRM through two tools:

### 1. getTwentyToolSpec
Get the full parameter specification for any operation before executing it.

**Always call this first** to understand what parameters are required.

```
getTwentyToolSpec({ toolName: "createOneCompany" })
```

Returns the complete input schema with all parameters, types, and descriptions.

### 2. executeTwentyApiCall
Execute an operation with the parameters from getTwentyToolSpec.

```
executeTwentyApiCall({
  toolName: "createOneCompany",
  parameters: {
    requestBody: {
      name: "Acme Corp"
    }
  }
})
```

### Workflow Example

To create a company:
1. Call `getTwentyToolSpec({ toolName: "createOneCompany" })` - see required parameters
2. Call `executeTwentyApiCall({ toolName: "createOneCompany", parameters: { requestBody: { name: "..." } } })`

---

## Best Practices

### Notes

**Critical: Always link notes to entities!**
- After creating a note with `createOneNote`, you **MUST** link it using `createOneNoteTarget`
- Without this step, notes won't be associated with any person/company/opportunity

**Workflow for notes:**
1. `getTwentyToolSpec({ toolName: "createOneNote" })`
2. `executeTwentyApiCall({ toolName: "createOneNote", parameters: { requestBody: { title: "...", body: "..." } } })`
3. Get the note ID from the response
4. `getTwentyToolSpec({ toolName: "createOneNoteTarget" })`
5. `executeTwentyApiCall({ toolName: "createOneNoteTarget", parameters: { requestBody: { noteId: "...", personId: "..." } } })`

**Note title format:** `Meeting FirstName LastName Date`
- Example: `Meeting Antonia Muttis 22.09.25`

**Note formatting:**
- Stay close to original structure
- Don't add information not in the original
- Don't add emojis
- Preserve user's writing style

### People

**Searching:** Use `ilike` for fuzzy name matching (handles typos):
```
executeTwentyApiCall({
  toolName: "findManyPeople",
  parameters: {
    filter: "name.firstName[ilike]:Anton"
  }
})
```

**Profile pictures:** When adding people, ask user permission before using any avatarUrl.

### Getting Records by ID

When you have an entity ID (e.g., a person's `companyId`), use `findOne*` operations:

```
executeTwentyApiCall({
  toolName: "findOneCompany",
  parameters: { id: "uuid-here" }
})
```

Don't iterate through all records with `findMany*` when you have the ID!

### Common Parameters

Most list operations (`findMany*`) support:
- `filter` - Filter results (e.g., `name[ilike]:John`)
- `order_by` - Sort results
- `limit` - Max results (default 60)
- `depth` - Include related objects (0, 1, or 2)

Most single-item operations require:
- `id` - UUID of the record
- `requestBody` - Data to create/update

---

*These guidelines are based on real-world usage of this Twenty CRM instance.*
