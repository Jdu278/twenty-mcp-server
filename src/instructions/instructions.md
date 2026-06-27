## Best Practices

### Notes

**Critical: Always link notes to entities!**
- After creating a note with `createOneNote`, you **MUST** link it using `createOneNoteTarget`.
- Without this step, notes won't be associated with any person/company/opportunity.

**Workflow for notes:**
1. Create the note with `createOneNote` — `requestBody: { title, body }`.
2. Read the new note's `id` from the response.
3. Link it with `createOneNoteTarget` — `requestBody: { noteId, personId }` (or `companyId` / `opportunityId`).

**Note title format:** `Meeting FirstName LastName Date`
- Example: `Meeting Antonia Muttis 22.09.25`

**Note formatting:**
- Stay close to original structure
- Don't add information not in the original
- Don't add emojis
- Preserve user's writing style

### People

**Searching:** Use `ilike` for fuzzy name matching (handles typos). On `findManyPeople`, pass a filter like `name.firstName[ilike]:Anton`.

**Profile pictures:** When adding people, ask user permission before using any `avatarUrl`.

### Getting Records by ID

When you have an entity ID (e.g. a person's `companyId`), use the `findOne*` operations with `{ id: "uuid-here" }` instead of scanning all records with `findMany*`.

### Common Parameters

Most list operations (`findMany*`) support:
- `filter` — Filter results (e.g. `name[ilike]:John`)
- `order_by` — Sort results
- `limit` — Max results (default 60)
- `depth` — Include related objects (0, 1, or 2)

Most single-item operations require:
- `id` — UUID of the record
- `requestBody` — Data to create/update

---

*These guidelines are based on real-world usage of this Twenty CRM instance.*
