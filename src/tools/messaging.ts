import { McpToolDefinition, ToolDefinitionMap } from './types.js';

/**
 * Messaging & Communication tool definitions
 * Includes MessageChannelMessageAssociation, MessageChannel, MessageFolder, MessageParticipant, Message, MessageThread tools
 */
export const messagingToolDefinitions: ToolDefinitionMap = new Map([
  // MessageChannelMessageAssociation tools
  ["findManyMessageChannelMessageAssociations", {
    name: "findManyMessageChannelMessageAssociations",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **messageChannelMessageAssociations**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/messageChannelMessageAssociations",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneMessageChannelMessageAssociation", {
    name: "createOneMessageChannelMessageAssociation",
    description: `Create One messageChannelMessageAssociation`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"messageId":{"type":"string","format":"uuid"},"messageChannelId":{"type":"string","format":"uuid"},"direction":{"type":"string","enum":["INCOMING","OUTGOING"],"description":"Message Direction"},"messageExternalId":{"type":"string","description":"Message id from the messaging provider"},"messageThreadExternalId":{"type":"string","description":"Thread id from the messaging provider"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageChannelMessageAssociations",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyMessageChannelMessageAssociations", {
    name: "createManyMessageChannelMessageAssociations",
    description: `Create Many messageChannelMessageAssociations`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Message Synced with a Message Channel","properties":{"messageId":{"type":"string","format":"uuid"},"messageChannelId":{"type":"string","format":"uuid"},"direction":{"type":"string","enum":["INCOMING","OUTGOING"],"description":"Message Direction"},"messageExternalId":{"type":"string","description":"Message id from the messaging provider"},"messageThreadExternalId":{"type":"string","description":"Thread id from the messaging provider"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/messageChannelMessageAssociations",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneMessageChannelMessageAssociation", {
    name: "findOneMessageChannelMessageAssociation",
    description: `**depth** can be provided to request your **messageChannelMessageAssociation**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/messageChannelMessageAssociations/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneMessageChannelMessageAssociation", {
    name: "deleteOneMessageChannelMessageAssociation",
    description: `Delete One messageChannelMessageAssociation`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/messageChannelMessageAssociations/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneMessageChannelMessageAssociation", {
    name: "UpdateOneMessageChannelMessageAssociation",
    description: `Update One messageChannelMessageAssociation`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"messageId":{"type":"string","format":"uuid"},"messageChannelId":{"type":"string","format":"uuid"},"direction":{"type":"string","enum":["INCOMING","OUTGOING"],"description":"Message Direction"},"messageExternalId":{"type":"string","description":"Message id from the messaging provider"},"messageThreadExternalId":{"type":"string","description":"Thread id from the messaging provider"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/messageChannelMessageAssociations/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findMessageChannelMessageAssociationDuplicates", {
    name: "findMessageChannelMessageAssociationDuplicates",
    description: `**depth** can be provided to request your **messageChannelMessageAssociation**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Message Synced with a Message Channel","properties":{"messageId":{"type":"string","format":"uuid"},"messageChannelId":{"type":"string","format":"uuid"},"direction":{"type":"string","enum":["INCOMING","OUTGOING"],"description":"Message Direction"},"messageExternalId":{"type":"string","description":"Message id from the messaging provider"},"messageThreadExternalId":{"type":"string","description":"Thread id from the messaging provider"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageChannelMessageAssociations/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  // MessageChannel tools
  ["findManyMessageChannels", {
    name: "findManyMessageChannels",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **messageChannels**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/messageChannels",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneMessageChannel", {
    name: "createOneMessageChannel",
    description: `Create One messageChannel`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"handle":{"type":"string","description":"Handle"},"type":{"type":"string","enum":["email","sms"],"description":"Channel Type"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["SENT_AND_RECEIVED","SENT","NONE"],"description":"Automatically create People records when receiving or sending emails"},"excludeNonProfessionalEmails":{"type":"boolean","description":"Exclude non professional emails"},"excludeGroupEmails":{"type":"boolean","description":"Exclude group emails"},"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"connectedAccountId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Last sync cursor"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_MESSAGE_LIST_FETCH_PENDING","PARTIAL_MESSAGE_LIST_FETCH_PENDING","MESSAGE_LIST_FETCH_ONGOING","MESSAGES_IMPORT_PENDING","MESSAGES_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"visibility":{"type":"string","enum":["METADATA","SUBJECT","SHARE_EVERYTHING"],"description":"Visibility"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageChannels",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyMessageChannels", {
    name: "createManyMessageChannels",
    description: `Create Many messageChannels`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Message Channels","properties":{"handle":{"type":"string","description":"Handle"},"type":{"type":"string","enum":["email","sms"],"description":"Channel Type"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["SENT_AND_RECEIVED","SENT","NONE"],"description":"Automatically create People records when receiving or sending emails"},"excludeNonProfessionalEmails":{"type":"boolean","description":"Exclude non professional emails"},"excludeGroupEmails":{"type":"boolean","description":"Exclude group emails"},"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"connectedAccountId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Last sync cursor"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_MESSAGE_LIST_FETCH_PENDING","PARTIAL_MESSAGE_LIST_FETCH_PENDING","MESSAGE_LIST_FETCH_ONGOING","MESSAGES_IMPORT_PENDING","MESSAGES_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"visibility":{"type":"string","enum":["METADATA","SUBJECT","SHARE_EVERYTHING"],"description":"Visibility"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/messageChannels",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneMessageChannel", {
    name: "findOneMessageChannel",
    description: `**depth** can be provided to request your **messageChannel**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/messageChannels/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneMessageChannel", {
    name: "deleteOneMessageChannel",
    description: `Delete One messageChannel`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/messageChannels/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneMessageChannel", {
    name: "UpdateOneMessageChannel",
    description: `Update One messageChannel`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"handle":{"type":"string","description":"Handle"},"type":{"type":"string","enum":["email","sms"],"description":"Channel Type"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["SENT_AND_RECEIVED","SENT","NONE"],"description":"Automatically create People records when receiving or sending emails"},"excludeNonProfessionalEmails":{"type":"boolean","description":"Exclude non professional emails"},"excludeGroupEmails":{"type":"boolean","description":"Exclude group emails"},"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"connectedAccountId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Last sync cursor"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_MESSAGE_LIST_FETCH_PENDING","PARTIAL_MESSAGE_LIST_FETCH_PENDING","MESSAGE_LIST_FETCH_ONGOING","MESSAGES_IMPORT_PENDING","MESSAGES_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"visibility":{"type":"string","enum":["METADATA","SUBJECT","SHARE_EVERYTHING"],"description":"Visibility"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/messageChannels/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findMessageChannelDuplicates", {
    name: "findMessageChannelDuplicates",
    description: `**depth** can be provided to request your **messageChannel**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Message Channels","properties":{"handle":{"type":"string","description":"Handle"},"type":{"type":"string","enum":["email","sms"],"description":"Channel Type"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["SENT_AND_RECEIVED","SENT","NONE"],"description":"Automatically create People records when receiving or sending emails"},"excludeNonProfessionalEmails":{"type":"boolean","description":"Exclude non professional emails"},"excludeGroupEmails":{"type":"boolean","description":"Exclude group emails"},"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"connectedAccountId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Last sync cursor"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_MESSAGE_LIST_FETCH_PENDING","PARTIAL_MESSAGE_LIST_FETCH_PENDING","MESSAGE_LIST_FETCH_ONGOING","MESSAGES_IMPORT_PENDING","MESSAGES_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"visibility":{"type":"string","enum":["METADATA","SUBJECT","SHARE_EVERYTHING"],"description":"Visibility"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageChannels/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  // MessageFolder tools
  ["findManyMessageFolders", {
    name: "findManyMessageFolders",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **messageFolders**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/messageFolders",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneMessageFolder", {
    name: "createOneMessageFolder",
    description: `Create One messageFolder`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"messageChannelId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Sync Cursor"},"name":{"type":"string","description":"Folder name"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageFolders",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyMessageFolders", {
    name: "createManyMessageFolders",
    description: `Create Many messageFolders`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Folder for Message Channel","properties":{"messageChannelId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Sync Cursor"},"name":{"type":"string","description":"Folder name"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/messageFolders",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneMessageFolder", {
    name: "findOneMessageFolder",
    description: `**depth** can be provided to request your **messageFolder**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/messageFolders/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneMessageFolder", {
    name: "deleteOneMessageFolder",
    description: `Delete One messageFolder`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/messageFolders/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneMessageFolder", {
    name: "UpdateOneMessageFolder",
    description: `Update One messageFolder`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"messageChannelId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Sync Cursor"},"name":{"type":"string","description":"Folder name"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/messageFolders/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findMessageFolderDuplicates", {
    name: "findMessageFolderDuplicates",
    description: `**depth** can be provided to request your **messageFolder**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Folder for Message Channel","properties":{"messageChannelId":{"type":"string","format":"uuid"},"syncCursor":{"type":"string","description":"Sync Cursor"},"name":{"type":"string","description":"Folder name"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageFolders/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  // MessageParticipant tools
  ["findManyMessageParticipants", {
    name: "findManyMessageParticipants",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **messageParticipants**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/messageParticipants",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneMessageParticipant", {
    name: "createOneMessageParticipant",
    description: `Create One messageParticipant`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"messageId":{"type":"string","format":"uuid"},"role":{"type":"string","enum":["from","to","cc","bcc"],"description":"Role"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageParticipants",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyMessageParticipants", {
    name: "createManyMessageParticipants",
    description: `Create Many messageParticipants`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Message Participants","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"messageId":{"type":"string","format":"uuid"},"role":{"type":"string","enum":["from","to","cc","bcc"],"description":"Role"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/messageParticipants",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneMessageParticipant", {
    name: "findOneMessageParticipant",
    description: `**depth** can be provided to request your **messageParticipant**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/messageParticipants/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneMessageParticipant", {
    name: "deleteOneMessageParticipant",
    description: `Delete One messageParticipant`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/messageParticipants/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneMessageParticipant", {
    name: "UpdateOneMessageParticipant",
    description: `Update One messageParticipant`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"messageId":{"type":"string","format":"uuid"},"role":{"type":"string","enum":["from","to","cc","bcc"],"description":"Role"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/messageParticipants/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findMessageParticipantDuplicates", {
    name: "findMessageParticipantDuplicates",
    description: `**depth** can be provided to request your **messageParticipant**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Message Participants","properties":{"workspaceMemberId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"messageId":{"type":"string","format":"uuid"},"role":{"type":"string","enum":["from","to","cc","bcc"],"description":"Role"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageParticipants/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  // Message tools
  ["findManyMessages", {
    name: "findManyMessages",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **messages**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/messages",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneMessage", {
    name: "createOneMessage",
    description: `Create One message`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"messageThreadId":{"type":"string","format":"uuid"},"headerMessageId":{"type":"string","description":"Message id from the message header"},"subject":{"type":"string","description":"Subject"},"text":{"type":"string","description":"Text"},"receivedAt":{"type":"string","format":"date-time","description":"The date the message was received"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messages",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyMessages", {
    name: "createManyMessages",
    description: `Create Many messages`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A message sent or received through a messaging channel (email, chat, etc.)","properties":{"messageThreadId":{"type":"string","format":"uuid"},"headerMessageId":{"type":"string","description":"Message id from the message header"},"subject":{"type":"string","description":"Subject"},"text":{"type":"string","description":"Text"},"receivedAt":{"type":"string","format":"date-time","description":"The date the message was received"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/messages",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneMessage", {
    name: "findOneMessage",
    description: `**depth** can be provided to request your **message**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/messages/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneMessage", {
    name: "deleteOneMessage",
    description: `Delete One message`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/messages/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneMessage", {
    name: "UpdateOneMessage",
    description: `Update One message`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"messageThreadId":{"type":"string","format":"uuid"},"headerMessageId":{"type":"string","description":"Message id from the message header"},"subject":{"type":"string","description":"Subject"},"text":{"type":"string","description":"Text"},"receivedAt":{"type":"string","format":"date-time","description":"The date the message was received"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/messages/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findMessageDuplicates", {
    name: "findMessageDuplicates",
    description: `**depth** can be provided to request your **message**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A message sent or received through a messaging channel (email, chat, etc.)","properties":{"messageThreadId":{"type":"string","format":"uuid"},"headerMessageId":{"type":"string","description":"Message id from the message header"},"subject":{"type":"string","description":"Subject"},"text":{"type":"string","description":"Text"},"receivedAt":{"type":"string","format":"date-time","description":"The date the message was received"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messages/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  // MessageThread tools
  ["findManyMessageThreads", {
    name: "findManyMessageThreads",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **messageThreads**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/messageThreads",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneMessageThread", {
    name: "createOneMessageThread",
    description: `Create One messageThread`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageThreads",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyMessageThreads", {
    name: "createManyMessageThreads",
    description: `Create Many messageThreads`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A group of related messages (e.g. email thread, chat thread)","properties":{}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/messageThreads",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneMessageThread", {
    name: "findOneMessageThread",
    description: `**depth** can be provided to request your **messageThread**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/messageThreads/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneMessageThread", {
    name: "deleteOneMessageThread",
    description: `Delete One messageThread`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/messageThreads/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneMessageThread", {
    name: "UpdateOneMessageThread",
    description: `Update One messageThread`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/messageThreads/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findMessageThreadDuplicates", {
    name: "findMessageThreadDuplicates",
    description: `**depth** can be provided to request your **messageThread**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A group of related messages (e.g. email thread, chat thread)","properties":{}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/messageThreads/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }]
]);