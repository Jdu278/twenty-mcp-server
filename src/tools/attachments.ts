import { ToolDefinitionMap } from '../types/McpToolDefinition.js';

/**
 * Tool definitions for Attachments
 */
export const attachmentsToolDefinitions: ToolDefinitionMap = new Map([

// Attachment tools
["findManyAttachments", {
  name: "findManyAttachments",
  description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **attachments**`,
  inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
  method: "get",
  pathTemplate: "/attachments",
  executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
  requestBodyContentType: undefined,
  securityRequirements: [{"bearerAuth":[]}]
}],
  ["createOneAttachment", {
    name: "createOneAttachment",
    description: `Create One attachment`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"authorId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"type":{"type":"string","description":"Attachment type"},"fullPath":{"type":"string","description":"Attachment full path"},"name":{"type":"string","description":"Attachment name"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/attachments",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyAttachments", {
    name: "createManyAttachments",
    description: `Create Many attachments`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"An attachment","properties":{"authorId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"type":{"type":"string","description":"Attachment type"},"fullPath":{"type":"string","description":"Attachment full path"},"name":{"type":"string","description":"Attachment name"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/attachments",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneAttachment", {
    name: "findOneAttachment",
    description: `**depth** can be provided to request your **attachment**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/attachments/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneAttachment", {
    name: "deleteOneAttachment",
    description: `Delete One attachment`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/attachments/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneAttachment", {
    name: "UpdateOneAttachment",
    description: `Update One attachment`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"authorId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"type":{"type":"string","description":"Attachment type"},"fullPath":{"type":"string","description":"Attachment full path"},"name":{"type":"string","description":"Attachment name"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/attachments/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findAttachmentDuplicates", {
    name: "findAttachmentDuplicates",
    description: `**depth** can be provided to request your **attachment**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"An attachment","properties":{"authorId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"type":{"type":"string","description":"Attachment type"},"fullPath":{"type":"string","description":"Attachment full path"},"name":{"type":"string","description":"Attachment name"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/attachments/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
])
