# Twenty CRM MCP Server - Best Practices & Usage Guidelines

This document contains important observations and best practices for using the Twenty CRM MCP tools effectively.

**Note:** These guidelines are based on my specific Twenty CRM instance and usage patterns. Your setup and requirements may differ, so feel free to adjust these practices for your use case.

## Notes

### Critical Workflow Requirements

**After creating notes, ALWAYS link them to entities:**
- When you create a note using `createOneNote`, you **MUST** immediately follow up with `createOneNoteTarget` or `createManyNoteTargets`
- This links the note to the relevant person, company, or opportunity
- Without this step, notes will exist but won't be associated with any contacts or companies

### Note Title Format

**Standard format:** `Meeting FirstName LastName Date`

**Examples:**
- `Meeting Antonia Muttis 22.09.25`
- `Meeting John Smith 15.03.25`

If the required information (name, date) is not provided:
- Try to infer from context
- If unable to determine, ask the user

### Note Formatting Guidelines

When improving or formatting notes:
- **Stay close to the original structure** - don't reorganize unless necessary
- **Don't add information** that wasn't in the original note
- **Don't add emojis** to notes
- Preserve the user's writing style and intent

## People

### Searching for People

**Use fuzzy/approximate search:**
- Users often make typos in people's names
- Use the `ilike` comparator for flexible name matching
- Consider partial matches when searching

**Example filter:**
```
name.firstName[ilike]:Elizab
```

### Adding People

**Profile Pictures (avatarUrl):**
- When creating a person, consider adding a profile picture via the `avatarUrl` parameter
- Search online for an appropriate image
- **IMPORTANT:** Always ask the user for permission before using an image
- Only add if you find a suitable professional photo

**Workflow:**
1. Search for person's profile picture (LinkedIn, company website, etc.)
2. Ask user: "I found a profile picture for [Name] at [URL]. Would you like me to use this?"
3. Only add `avatarUrl` if user approves

---

*Last updated: 2025-10-21*
*These guidelines are based on real-world usage and testing of this Twenty CRM instance.*