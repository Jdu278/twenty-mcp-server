import { McpToolDefinition, ToolDefinitionMap } from './types.js';

/**
 * User Preferences & Organization tool definitions  
 * Includes Favorite, FavoriteFolder, and Blocklist tools
 */
export const preferencesToolDefinitions: ToolDefinitionMap = new Map([
  // Favorite tools
  ["findManyFavorites", {
    name: "findManyFavorites",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **favorites**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/favorites",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneFavorite", {
    name: "createOneFavorite",
    description: `Create One favorite`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Favorite position"},"viewId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"favoriteFolderId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"forWorkspaceMemberId":{"type":"string","format":"uuid"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/favorites",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyFavorites", {
    name: "createManyFavorites",
    description: `Create Many favorites`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A favorite that can be accessed from the left menu","properties":{"position":{"type":"number","description":"Favorite position"},"viewId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"favoriteFolderId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"forWorkspaceMemberId":{"type":"string","format":"uuid"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/favorites",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneFavorite", {
    name: "findOneFavorite",
    description: `**depth** can be provided to request your **favorite**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/favorites/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneFavorite", {
    name: "deleteOneFavorite",
    description: `Delete One favorite`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/favorites/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneFavorite", {
    name: "UpdateOneFavorite",
    description: `Update One favorite`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Favorite position"},"viewId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"favoriteFolderId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"forWorkspaceMemberId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/favorites/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findFavoriteDuplicates", {
    name: "findFavoriteDuplicates",
    description: `**depth** can be provided to request your **favorite**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A favorite that can be accessed from the left menu","properties":{"position":{"type":"number","description":"Favorite position"},"viewId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"favoriteFolderId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"forWorkspaceMemberId":{"type":"string","format":"uuid"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/favorites/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  
  // FavoriteFolder tools
  ["findManyFavoriteFolders", {
    name: "findManyFavoriteFolders",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **favoriteFolders**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/favoriteFolders",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneFavoriteFolder", {
    name: "createOneFavoriteFolder",
    description: `Create One favoriteFolder`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Favorite folder position"},"name":{"type":"string","description":"Name of the favorite folder"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/favoriteFolders",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyFavoriteFolders", {
    name: "createManyFavoriteFolders",
    description: `Create Many favoriteFolders`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A Folder of favorites","properties":{"position":{"type":"number","description":"Favorite folder position"},"name":{"type":"string","description":"Name of the favorite folder"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/favoriteFolders",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneFavoriteFolder", {
    name: "findOneFavoriteFolder",
    description: `**depth** can be provided to request your **favoriteFolder**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/favoriteFolders/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneFavoriteFolder", {
    name: "deleteOneFavoriteFolder",
    description: `Delete One favoriteFolder`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/favoriteFolders/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneFavoriteFolder", {
    name: "UpdateOneFavoriteFolder",
    description: `Update One favoriteFolder`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Favorite folder position"},"name":{"type":"string","description":"Name of the favorite folder"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/favoriteFolders/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findFavoriteFolderDuplicates", {
    name: "findFavoriteFolderDuplicates",
    description: `**depth** can be provided to request your **favoriteFolder**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A Folder of favorites","properties":{"position":{"type":"number","description":"Favorite folder position"},"name":{"type":"string","description":"Name of the favorite folder"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/favoriteFolders/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // Blocklist tools
  ["findManyBlocklists", {
    name: "findManyBlocklists",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **blocklists**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/blocklists",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneBlocklist", {
    name: "createOneBlocklist",
    description: `Create One blocklist`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/blocklists",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyBlocklists", {
    name: "createManyBlocklists",
    description: `Create Many blocklists`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Blocklist","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/blocklists",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneBlocklist", {
    name: "findOneBlocklist",
    description: `**depth** can be provided to request your **blocklist**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/blocklists/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneBlocklist", {
    name: "deleteOneBlocklist",
    description: `Delete One blocklist`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/blocklists/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneBlocklist", {
    name: "UpdateOneBlocklist",
    description: `Update One blocklist`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/blocklists/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findBlocklistDuplicates", {
    name: "findBlocklistDuplicates",
    description: `**depth** can be provided to request your **blocklist**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Blocklist","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/blocklists/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }]
]);