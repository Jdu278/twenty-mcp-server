import { ToolDefinitionMap } from './McpToolDefinition.js';

/**
 * Calendar-related tool definitions for CalendarChannels, CalendarEvents, CalendarEventParticipants, and CalendarChannelEventAssociations
 */
export const calendarToolDefinitions: ToolDefinitionMap = new Map([
  // CalendarChannelEventAssociation tools
  ["findManyCalendarChannelEventAssociations", {
    name: "findManyCalendarChannelEventAssociations",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **calendarChannelEventAssociations**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/calendarChannelEventAssociations",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneCalendarChannelEventAssociation", {
    name: "createOneCalendarChannelEventAssociation",
    description: `Create One calendarChannelEventAssociation`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"calendarChannelId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"eventExternalId":{"type":"string","description":"Event external ID"},"recurringEventExternalId":{"type":"string","description":"Recurring Event ID"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarChannelEventAssociations",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyCalendarChannelEventAssociations", {
    name: "createManyCalendarChannelEventAssociations",
    description: `Create Many calendarChannelEventAssociations`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Calendar Channel Event Associations","properties":{"calendarChannelId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"eventExternalId":{"type":"string","description":"Event external ID"},"recurringEventExternalId":{"type":"string","description":"Recurring Event ID"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/calendarChannelEventAssociations",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneCalendarChannelEventAssociation", {
    name: "findOneCalendarChannelEventAssociation",
    description: `**depth** can be provided to request your **calendarChannelEventAssociation**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/calendarChannelEventAssociations/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneCalendarChannelEventAssociation", {
    name: "deleteOneCalendarChannelEventAssociation",
    description: `Delete One calendarChannelEventAssociation`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/calendarChannelEventAssociations/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneCalendarChannelEventAssociation", {
    name: "UpdateOneCalendarChannelEventAssociation",
    description: `Update One calendarChannelEventAssociation`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"calendarChannelId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"eventExternalId":{"type":"string","description":"Event external ID"},"recurringEventExternalId":{"type":"string","description":"Recurring Event ID"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/calendarChannelEventAssociations/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findCalendarChannelEventAssociationDuplicates", {
    name: "findCalendarChannelEventAssociationDuplicates",
    description: `**depth** can be provided to request your **calendarChannelEventAssociation**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Calendar Channel Event Associations","properties":{"calendarChannelId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"eventExternalId":{"type":"string","description":"Event external ID"},"recurringEventExternalId":{"type":"string","description":"Recurring Event ID"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarChannelEventAssociations/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  
  // CalendarChannel tools
  ["findManyCalendarChannels", {
    name: "findManyCalendarChannels",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **calendarChannels**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/calendarChannels",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneCalendarChannel", {
    name: "createOneCalendarChannel",
    description: `Create One calendarChannel`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"syncCursor":{"type":"string","description":"Sync Cursor. Used for syncing events from the calendar provider"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"connectedAccountId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_CALENDAR_EVENT_LIST_FETCH_PENDING","PARTIAL_CALENDAR_EVENT_LIST_FETCH_PENDING","CALENDAR_EVENT_LIST_FETCH_ONGOING","CALENDAR_EVENTS_IMPORT_PENDING","CALENDAR_EVENTS_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"visibility":{"type":"string","enum":["METADATA","SHARE_EVERYTHING"],"description":"Visibility"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["AS_PARTICIPANT_AND_ORGANIZER","AS_PARTICIPANT","AS_ORGANIZER","NONE"],"description":"Automatically create records for people you participated with in an event."}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarChannels",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyCalendarChannels", {
    name: "createManyCalendarChannels",
    description: `Create Many calendarChannels`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Calendar Channels","properties":{"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"syncCursor":{"type":"string","description":"Sync Cursor. Used for syncing events from the calendar provider"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"connectedAccountId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_CALENDAR_EVENT_LIST_FETCH_PENDING","PARTIAL_CALENDAR_EVENT_LIST_FETCH_PENDING","CALENDAR_EVENT_LIST_FETCH_ONGOING","CALENDAR_EVENTS_IMPORT_PENDING","CALENDAR_EVENTS_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"visibility":{"type":"string","enum":["METADATA","SHARE_EVERYTHING"],"description":"Visibility"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["AS_PARTICIPANT_AND_ORGANIZER","AS_PARTICIPANT","AS_ORGANIZER","NONE"],"description":"Automatically create records for people you participated with in an event."}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/calendarChannels",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneCalendarChannel", {
    name: "findOneCalendarChannel",
    description: `**depth** can be provided to request your **calendarChannel**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/calendarChannels/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneCalendarChannel", {
    name: "deleteOneCalendarChannel",
    description: `Delete One calendarChannel`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/calendarChannels/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneCalendarChannel", {
    name: "UpdateOneCalendarChannel",
    description: `Update One calendarChannel`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"syncCursor":{"type":"string","description":"Sync Cursor. Used for syncing events from the calendar provider"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"connectedAccountId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_CALENDAR_EVENT_LIST_FETCH_PENDING","PARTIAL_CALENDAR_EVENT_LIST_FETCH_PENDING","CALENDAR_EVENT_LIST_FETCH_ONGOING","CALENDAR_EVENTS_IMPORT_PENDING","CALENDAR_EVENTS_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"visibility":{"type":"string","enum":["METADATA","SHARE_EVERYTHING"],"description":"Visibility"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["AS_PARTICIPANT_AND_ORGANIZER","AS_PARTICIPANT","AS_ORGANIZER","NONE"],"description":"Automatically create records for people you participated with in an event."}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/calendarChannels/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findCalendarChannelDuplicates", {
    name: "findCalendarChannelDuplicates",
    description: `**depth** can be provided to request your **calendarChannel**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Calendar Channels","properties":{"isSyncEnabled":{"type":"boolean","description":"Is Sync Enabled"},"syncCursor":{"type":"string","description":"Sync Cursor. Used for syncing events from the calendar provider"},"syncedAt":{"type":"string","format":"date-time","description":"Last sync date"},"syncStageStartedAt":{"type":"string","format":"date-time","description":"Sync stage started at"},"throttleFailureCount":{"type":"number","description":"Throttle Failure Count"},"connectedAccountId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"syncStatus":{"type":"string","enum":["ONGOING","NOT_SYNCED","ACTIVE","FAILED_INSUFFICIENT_PERMISSIONS","FAILED_UNKNOWN"],"description":"Sync status"},"syncStage":{"type":"string","enum":["FULL_CALENDAR_EVENT_LIST_FETCH_PENDING","PARTIAL_CALENDAR_EVENT_LIST_FETCH_PENDING","CALENDAR_EVENT_LIST_FETCH_ONGOING","CALENDAR_EVENTS_IMPORT_PENDING","CALENDAR_EVENTS_IMPORT_ONGOING","FAILED"],"description":"Sync stage"},"visibility":{"type":"string","enum":["METADATA","SHARE_EVERYTHING"],"description":"Visibility"},"isContactAutoCreationEnabled":{"type":"boolean","description":"Is Contact Auto Creation Enabled"},"contactAutoCreationPolicy":{"type":"string","enum":["AS_PARTICIPANT_AND_ORGANIZER","AS_PARTICIPANT","AS_ORGANIZER","NONE"],"description":"Automatically create records for people you participated with in an event."}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarChannels/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  
  // CalendarEventParticipant tools
  ["findManyCalendarEventParticipants", {
    name: "findManyCalendarEventParticipants",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **calendarEventParticipants**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/calendarEventParticipants",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneCalendarEventParticipant", {
    name: "createOneCalendarEventParticipant",
    description: `Create One calendarEventParticipant`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"isOrganizer":{"type":"boolean","description":"Is Organizer"},"responseStatus":{"type":"string","enum":["NEEDS_ACTION","DECLINED","TENTATIVE","ACCEPTED"],"description":"Response Status"},"workspaceMemberId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarEventParticipants",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyCalendarEventParticipants", {
    name: "createManyCalendarEventParticipants",
    description: `Create Many calendarEventParticipants`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Calendar event participants","properties":{"isOrganizer":{"type":"boolean","description":"Is Organizer"},"responseStatus":{"type":"string","enum":["NEEDS_ACTION","DECLINED","TENTATIVE","ACCEPTED"],"description":"Response Status"},"workspaceMemberId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/calendarEventParticipants",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneCalendarEventParticipant", {
    name: "findOneCalendarEventParticipant",
    description: `**depth** can be provided to request your **calendarEventParticipant**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/calendarEventParticipants/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneCalendarEventParticipant", {
    name: "deleteOneCalendarEventParticipant",
    description: `Delete One calendarEventParticipant`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/calendarEventParticipants/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneCalendarEventParticipant", {
    name: "UpdateOneCalendarEventParticipant",
    description: `Update One calendarEventParticipant`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"isOrganizer":{"type":"boolean","description":"Is Organizer"},"responseStatus":{"type":"string","enum":["NEEDS_ACTION","DECLINED","TENTATIVE","ACCEPTED"],"description":"Response Status"},"workspaceMemberId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/calendarEventParticipants/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findCalendarEventParticipantDuplicates", {
    name: "findCalendarEventParticipantDuplicates",
    description: `**depth** can be provided to request your **calendarEventParticipant**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Calendar event participants","properties":{"isOrganizer":{"type":"boolean","description":"Is Organizer"},"responseStatus":{"type":"string","enum":["NEEDS_ACTION","DECLINED","TENTATIVE","ACCEPTED"],"description":"Response Status"},"workspaceMemberId":{"type":"string","format":"uuid"},"calendarEventId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"handle":{"type":"string","description":"Handle"},"displayName":{"type":"string","description":"Display Name"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarEventParticipants/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  
  // CalendarEvent tools
  ["findManyCalendarEvents", {
    name: "findManyCalendarEvents",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **calendarEvents**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/calendarEvents",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneCalendarEvent", {
    name: "createOneCalendarEvent",
    description: `Create One calendarEvent`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"title":{"type":"string","description":"Title"},"isFullDay":{"type":"boolean","description":"Is Full Day"},"startsAt":{"type":"string","format":"date-time","description":"Start Date"},"endsAt":{"type":"string","format":"date-time","description":"End Date"},"externalCreatedAt":{"type":"string","format":"date-time","description":"Creation DateTime"},"externalUpdatedAt":{"type":"string","format":"date-time","description":"Update DateTime"},"description":{"type":"string","description":"Description"},"location":{"type":"string","description":"Location"},"iCalUID":{"type":"string","description":"iCal UID"},"conferenceSolution":{"type":"string","description":"Conference Solution"},"conferenceLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Meet Link"},"isCanceled":{"type":"boolean","description":"Is canceled"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarEvents",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyCalendarEvents", {
    name: "createManyCalendarEvents",
    description: `Create Many calendarEvents`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"Calendar events","properties":{"title":{"type":"string","description":"Title"},"isFullDay":{"type":"boolean","description":"Is Full Day"},"startsAt":{"type":"string","format":"date-time","description":"Start Date"},"endsAt":{"type":"string","format":"date-time","description":"End Date"},"externalCreatedAt":{"type":"string","format":"date-time","description":"Creation DateTime"},"externalUpdatedAt":{"type":"string","format":"date-time","description":"Update DateTime"},"description":{"type":"string","description":"Description"},"location":{"type":"string","description":"Location"},"iCalUID":{"type":"string","description":"iCal UID"},"conferenceSolution":{"type":"string","description":"Conference Solution"},"conferenceLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Meet Link"},"isCanceled":{"type":"boolean","description":"Is canceled"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/calendarEvents",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneCalendarEvent", {
    name: "findOneCalendarEvent",
    description: `**depth** can be provided to request your **calendarEvent**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/calendarEvents/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneCalendarEvent", {
    name: "deleteOneCalendarEvent",
    description: `Delete One calendarEvent`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/calendarEvents/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneCalendarEvent", {
    name: "UpdateOneCalendarEvent",
    description: `Update One calendarEvent`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"title":{"type":"string","description":"Title"},"isFullDay":{"type":"boolean","description":"Is Full Day"},"startsAt":{"type":"string","format":"date-time","description":"Start Date"},"endsAt":{"type":"string","format":"date-time","description":"End Date"},"externalCreatedAt":{"type":"string","format":"date-time","description":"Creation DateTime"},"externalUpdatedAt":{"type":"string","format":"date-time","description":"Update DateTime"},"description":{"type":"string","description":"Description"},"location":{"type":"string","description":"Location"},"iCalUID":{"type":"string","description":"iCal UID"},"conferenceSolution":{"type":"string","description":"Conference Solution"},"conferenceLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Meet Link"},"isCanceled":{"type":"boolean","description":"Is canceled"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/calendarEvents/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findCalendarEventDuplicates", {
    name: "findCalendarEventDuplicates",
    description: `**depth** can be provided to request your **calendarEvent**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"Calendar events","properties":{"title":{"type":"string","description":"Title"},"isFullDay":{"type":"boolean","description":"Is Full Day"},"startsAt":{"type":"string","format":"date-time","description":"Start Date"},"endsAt":{"type":"string","format":"date-time","description":"End Date"},"externalCreatedAt":{"type":"string","format":"date-time","description":"Creation DateTime"},"externalUpdatedAt":{"type":"string","format":"date-time","description":"Update DateTime"},"description":{"type":"string","description":"Description"},"location":{"type":"string","description":"Location"},"iCalUID":{"type":"string","description":"iCal UID"},"conferenceSolution":{"type":"string","description":"Conference Solution"},"conferenceLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Meet Link"},"isCanceled":{"type":"boolean","description":"Is canceled"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/calendarEvents/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }]
]);