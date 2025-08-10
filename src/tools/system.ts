import { ToolDefinitionMap } from './McpToolDefinition.js';

/**
 * System & Admin tool definitions
 * Includes ConnectedAccount, WorkspaceMember, TimelineActivity tools
 */
export const systemToolDefinitions: ToolDefinitionMap = new Map([
  // ConnectedAccount tools
  ["findManyConnectedAccounts", {
    name: "findManyConnectedAccounts",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **connectedAccounts**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/connectedAccounts",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneConnectedAccount", {
    name: "createOneConnectedAccount",
    description: `Create One connectedAccount`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"lastSyncHistoryId":{"type":"string","description":"Last sync history ID"},"refreshToken":{"type":"string","description":"Messaging provider refresh token"},"accessToken":{"type":"string","description":"Messaging provider access token"},"provider":{"type":"string","description":"The account provider"},"handle":{"type":"string","description":"The account handle (email, username, phone number, etc.)"},"accountOwnerId":{"type":"string","format":"uuid"},"authFailedAt":{"type":"string","format":"date-time","description":"Auth failed at"},"handleAliases":{"type":"string","description":"Handle Aliases"},"connectionParameters":{"type":"object","description":"JSON object containing custom connection parameters"},"scopes":{"type":"array","items":{"type":"string"},"description":"Scopes"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/connectedAccounts",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyConnectedAccounts", {
    name: "createManyConnectedAccounts",
    description: `Create Many connectedAccounts`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A connected account","properties":{"lastSyncHistoryId":{"type":"string","description":"Last sync history ID"},"refreshToken":{"type":"string","description":"Messaging provider refresh token"},"accessToken":{"type":"string","description":"Messaging provider access token"},"provider":{"type":"string","description":"The account provider"},"handle":{"type":"string","description":"The account handle (email, username, phone number, etc.)"},"accountOwnerId":{"type":"string","format":"uuid"},"authFailedAt":{"type":"string","format":"date-time","description":"Auth failed at"},"handleAliases":{"type":"string","description":"Handle Aliases"},"connectionParameters":{"type":"object","description":"JSON object containing custom connection parameters"},"scopes":{"type":"array","items":{"type":"string"},"description":"Scopes"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/connectedAccounts",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneConnectedAccount", {
    name: "findOneConnectedAccount",
    description: `**depth** can be provided to request your **connectedAccount**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/connectedAccounts/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneConnectedAccount", {
    name: "deleteOneConnectedAccount",
    description: `Delete One connectedAccount`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/connectedAccounts/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneConnectedAccount", {
    name: "UpdateOneConnectedAccount",
    description: `Update One connectedAccount`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"lastSyncHistoryId":{"type":"string","description":"Last sync history ID"},"refreshToken":{"type":"string","description":"Messaging provider refresh token"},"accessToken":{"type":"string","description":"Messaging provider access token"},"provider":{"type":"string","description":"The account provider"},"handle":{"type":"string","description":"The account handle (email, username, phone number, etc.)"},"accountOwnerId":{"type":"string","format":"uuid"},"authFailedAt":{"type":"string","format":"date-time","description":"Auth failed at"},"handleAliases":{"type":"string","description":"Handle Aliases"},"connectionParameters":{"type":"object","description":"JSON object containing custom connection parameters"},"scopes":{"type":"array","items":{"type":"string"},"description":"Scopes"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/connectedAccounts/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findConnectedAccountDuplicates", {
    name: "findConnectedAccountDuplicates",
    description: `**depth** can be provided to request your **connectedAccount**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A connected account","properties":{"lastSyncHistoryId":{"type":"string","description":"Last sync history ID"},"refreshToken":{"type":"string","description":"Messaging provider refresh token"},"accessToken":{"type":"string","description":"Messaging provider access token"},"provider":{"type":"string","description":"The account provider"},"handle":{"type":"string","description":"The account handle (email, username, phone number, etc.)"},"accountOwnerId":{"type":"string","format":"uuid"},"authFailedAt":{"type":"string","format":"date-time","description":"Auth failed at"},"handleAliases":{"type":"string","description":"Handle Aliases"},"connectionParameters":{"type":"object","description":"JSON object containing custom connection parameters"},"scopes":{"type":"array","items":{"type":"string"},"description":"Scopes"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/connectedAccounts/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // WorkspaceMember tools
  ["findManyWorkspaceMembers", {
    name: "findManyWorkspaceMembers",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **workspaceMembers**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/workspaceMembers",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneWorkspaceMember", {
    name: "createOneWorkspaceMember",
    description: `Create One workspaceMember`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"timeFormat":{"type":"string","enum":["SYSTEM","HOUR_24","HOUR_12"],"description":"User's preferred time format"},"dateFormat":{"type":"string","enum":["SYSTEM","MONTH_FIRST","DAY_FIRST","YEAR_FIRST"],"description":"User's preferred date format"},"timeZone":{"type":"string","description":"User time zone"},"userId":{"type":"string","format":"uuid","description":"Associated User Id"},"userEmail":{"type":"string","description":"Related user email address"},"avatarUrl":{"type":"string","description":"Workspace member avatar"},"locale":{"type":"string","description":"Preferred language"},"colorScheme":{"type":"string","description":"Preferred color scheme"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Workspace member name"},"position":{"type":"number","description":"Workspace member position"}},"required":["userId"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workspaceMembers",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyWorkspaceMembers", {
    name: "createManyWorkspaceMembers",
    description: `Create Many workspaceMembers`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A workspace member","properties":{"timeFormat":{"type":"string","enum":["SYSTEM","HOUR_24","HOUR_12"],"description":"User's preferred time format"},"dateFormat":{"type":"string","enum":["SYSTEM","MONTH_FIRST","DAY_FIRST","YEAR_FIRST"],"description":"User's preferred date format"},"timeZone":{"type":"string","description":"User time zone"},"userId":{"type":"string","format":"uuid","description":"Associated User Id"},"userEmail":{"type":"string","description":"Related user email address"},"avatarUrl":{"type":"string","description":"Workspace member avatar"},"locale":{"type":"string","description":"Preferred language"},"colorScheme":{"type":"string","description":"Preferred color scheme"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Workspace member name"},"position":{"type":"number","description":"Workspace member position"}},"required":["userId"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/workspaceMembers",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneWorkspaceMember", {
    name: "findOneWorkspaceMember",
    description: `**depth** can be provided to request your **workspaceMember**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/workspaceMembers/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneWorkspaceMember", {
    name: "deleteOneWorkspaceMember",
    description: `Delete One workspaceMember`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/workspaceMembers/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneWorkspaceMember", {
    name: "UpdateOneWorkspaceMember",
    description: `Update One workspaceMember`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"timeFormat":{"type":"string","enum":["SYSTEM","HOUR_24","HOUR_12"],"description":"User's preferred time format"},"dateFormat":{"type":"string","enum":["SYSTEM","MONTH_FIRST","DAY_FIRST","YEAR_FIRST"],"description":"User's preferred date format"},"timeZone":{"type":"string","description":"User time zone"},"userId":{"type":"string","format":"uuid","description":"Associated User Id"},"userEmail":{"type":"string","description":"Related user email address"},"avatarUrl":{"type":"string","description":"Workspace member avatar"},"locale":{"type":"string","description":"Preferred language"},"colorScheme":{"type":"string","description":"Preferred color scheme"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Workspace member name"},"position":{"type":"number","description":"Workspace member position"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/workspaceMembers/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findWorkspaceMemberDuplicates", {
    name: "findWorkspaceMemberDuplicates",
    description: `**depth** can be provided to request your **workspaceMember**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A workspace member","properties":{"timeFormat":{"type":"string","enum":["SYSTEM","HOUR_24","HOUR_12"],"description":"User's preferred time format"},"dateFormat":{"type":"string","enum":["SYSTEM","MONTH_FIRST","DAY_FIRST","YEAR_FIRST"],"description":"User's preferred date format"},"timeZone":{"type":"string","description":"User time zone"},"userId":{"type":"string","format":"uuid","description":"Associated User Id"},"userEmail":{"type":"string","description":"Related user email address"},"avatarUrl":{"type":"string","description":"Workspace member avatar"},"locale":{"type":"string","description":"Preferred language"},"colorScheme":{"type":"string","description":"Preferred color scheme"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Workspace member name"},"position":{"type":"number","description":"Workspace member position"}},"required":["userId"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workspaceMembers/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // TimelineActivity tools
  ["findManyTimelineActivities", {
    name: "findManyTimelineActivities",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **timelineActivities**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/timelineActivities",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneTimelineActivity", {
    name: "createOneTimelineActivity",
    description: `Create One timelineActivity`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"linkedRecordId":{"type":"string","format":"uuid","description":"Linked Record id"},"linkedRecordCachedName":{"type":"string","description":"Cached record name"},"properties":{"type":"object","description":"Json value for event details"},"name":{"type":"string","description":"Event name"},"happensAt":{"type":"string","format":"date-time","description":"Creation date"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workspaceMemberId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"linkedObjectMetadataId":{"type":"string","format":"uuid","description":"Linked Object Metadata Id"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/timelineActivities",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyTimelineActivities", {
    name: "createManyTimelineActivities",
    description: `Create Many timelineActivities`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Aggregated / filtered event to be displayed on the timeline","properties":{"linkedRecordId":{"type":"string","format":"uuid","description":"Linked Record id"},"linkedRecordCachedName":{"type":"string","description":"Cached record name"},"properties":{"type":"object","description":"Json value for event details"},"name":{"type":"string","description":"Event name"},"happensAt":{"type":"string","format":"date-time","description":"Creation date"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workspaceMemberId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"linkedObjectMetadataId":{"type":"string","format":"uuid","description":"Linked Object Metadata Id"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/timelineActivities",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneTimelineActivity", {
    name: "findOneTimelineActivity",
    description: `**depth** can be provided to request your **timelineActivity**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/timelineActivities/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneTimelineActivity", {
    name: "deleteOneTimelineActivity",
    description: `Delete One timelineActivity`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/timelineActivities/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneTimelineActivity", {
    name: "UpdateOneTimelineActivity",
    description: `Update One timelineActivity`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"linkedRecordId":{"type":"string","format":"uuid","description":"Linked Record id"},"linkedRecordCachedName":{"type":"string","description":"Cached record name"},"properties":{"type":"object","description":"Json value for event details"},"name":{"type":"string","description":"Event name"},"happensAt":{"type":"string","format":"date-time","description":"Creation date"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workspaceMemberId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"linkedObjectMetadataId":{"type":"string","format":"uuid","description":"Linked Object Metadata Id"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/timelineActivities/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findTimelineActivityDuplicates", {
    name: "findTimelineActivityDuplicates",
    description: `**depth** can be provided to request your **timelineActivity**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Aggregated / filtered event to be displayed on the timeline","properties":{"linkedRecordId":{"type":"string","format":"uuid","description":"Linked Record id"},"linkedRecordCachedName":{"type":"string","description":"Cached record name"},"properties":{"type":"object","description":"Json value for event details"},"name":{"type":"string","description":"Event name"},"happensAt":{"type":"string","format":"date-time","description":"Creation date"},"workflowVersionId":{"type":"string","format":"uuid"},"workflowRunId":{"type":"string","format":"uuid"},"workspaceMemberId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"workflowId":{"type":"string","format":"uuid"},"taskId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"},"linkedObjectMetadataId":{"type":"string","format":"uuid","description":"Linked Object Metadata Id"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/timelineActivities/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
]);