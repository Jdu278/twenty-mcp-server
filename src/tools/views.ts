import { McpToolDefinition, ToolDefinitionMap } from './types.js';

/**
 * Data Views & Filtering tool definitions
 * Includes View, ViewField, ViewFilter, ViewFilterGroup, ViewGroup, ViewSort tools
 */
export const viewsToolDefinitions: ToolDefinitionMap = new Map([
  // View tools
  ["findManyViews", {
    name: "findManyViews",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **views**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/views",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneView", {
    name: "createOneView",
    description: `Create One view`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"name":{"type":"string","description":"View name"},"position":{"type":"number","description":"View position"},"isCompact":{"type":"boolean","description":"Describes if the view is in compact mode"},"openRecordIn":{"type":"string","enum":["SIDE_PANEL","RECORD_PAGE"],"description":"Display the records in a side panel or in a record page"},"anyFieldFilterValue":{"type":"string","description":"Any field filter value"},"kanbanAggregateOperationFieldMetadataId":{"type":"string","format":"uuid","description":"Field metadata used for aggregate operation"},"kanbanAggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"objectMetadataId":{"type":"string","format":"uuid","description":"View target object"},"type":{"type":"string","description":"View type"},"key":{"type":"string","enum":["INDEX"],"description":"View key"},"icon":{"type":"string","description":"View icon"},"kanbanFieldMetadataId":{"type":"string","description":"View Kanban column field"}},"required":["objectMetadataId"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/views",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyViews", {
    name: "createManyViews",
    description: `Create Many views`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"(System) Views","properties":{"name":{"type":"string","description":"View name"},"position":{"type":"number","description":"View position"},"isCompact":{"type":"boolean","description":"Describes if the view is in compact mode"},"openRecordIn":{"type":"string","enum":["SIDE_PANEL","RECORD_PAGE"],"description":"Display the records in a side panel or in a record page"},"anyFieldFilterValue":{"type":"string","description":"Any field filter value"},"kanbanAggregateOperationFieldMetadataId":{"type":"string","format":"uuid","description":"Field metadata used for aggregate operation"},"kanbanAggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"objectMetadataId":{"type":"string","format":"uuid","description":"View target object"},"type":{"type":"string","description":"View type"},"key":{"type":"string","enum":["INDEX"],"description":"View key"},"icon":{"type":"string","description":"View icon"},"kanbanFieldMetadataId":{"type":"string","description":"View Kanban column field"}},"required":["objectMetadataId"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/views",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneView", {
    name: "findOneView",
    description: `**depth** can be provided to request your **view**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/views/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneView", {
    name: "deleteOneView",
    description: `Delete One view`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/views/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneView", {
    name: "UpdateOneView",
    description: `Update One view`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"name":{"type":"string","description":"View name"},"position":{"type":"number","description":"View position"},"isCompact":{"type":"boolean","description":"Describes if the view is in compact mode"},"openRecordIn":{"type":"string","enum":["SIDE_PANEL","RECORD_PAGE"],"description":"Display the records in a side panel or in a record page"},"anyFieldFilterValue":{"type":"string","description":"Any field filter value"},"kanbanAggregateOperationFieldMetadataId":{"type":"string","format":"uuid","description":"Field metadata used for aggregate operation"},"kanbanAggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"objectMetadataId":{"type":"string","format":"uuid","description":"View target object"},"type":{"type":"string","description":"View type"},"key":{"type":"string","enum":["INDEX"],"description":"View key"},"icon":{"type":"string","description":"View icon"},"kanbanFieldMetadataId":{"type":"string","description":"View Kanban column field"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/views/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findViewDuplicates", {
    name: "findViewDuplicates",
    description: `**depth** can be provided to request your **view**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"(System) Views","properties":{"name":{"type":"string","description":"View name"},"position":{"type":"number","description":"View position"},"isCompact":{"type":"boolean","description":"Describes if the view is in compact mode"},"openRecordIn":{"type":"string","enum":["SIDE_PANEL","RECORD_PAGE"],"description":"Display the records in a side panel or in a record page"},"anyFieldFilterValue":{"type":"string","description":"Any field filter value"},"kanbanAggregateOperationFieldMetadataId":{"type":"string","format":"uuid","description":"Field metadata used for aggregate operation"},"kanbanAggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"objectMetadataId":{"type":"string","format":"uuid","description":"View target object"},"type":{"type":"string","description":"View type"},"key":{"type":"string","enum":["INDEX"],"description":"View key"},"icon":{"type":"string","description":"View icon"},"kanbanFieldMetadataId":{"type":"string","description":"View Kanban column field"}},"required":["objectMetadataId"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/views/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // ViewField tools
  ["findManyViewFields", {
    name: "findManyViewFields",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **viewFields**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/viewFields",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneViewField", {
    name: "createOneViewField",
    description: `Create One viewField`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"isVisible":{"type":"boolean","description":"View Field visibility"},"viewId":{"type":"string","format":"uuid"},"aggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"position":{"type":"number","description":"View Field position"},"size":{"type":"number","description":"View Field size"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Field target field"}},"required":["fieldMetadataId"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewFields",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyViewFields", {
    name: "createManyViewFields",
    description: `Create Many viewFields`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"(System) View Fields","properties":{"isVisible":{"type":"boolean","description":"View Field visibility"},"viewId":{"type":"string","format":"uuid"},"aggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"position":{"type":"number","description":"View Field position"},"size":{"type":"number","description":"View Field size"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Field target field"}},"required":["fieldMetadataId"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/viewFields",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneViewField", {
    name: "findOneViewField",
    description: `**depth** can be provided to request your **viewField**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/viewFields/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneViewField", {
    name: "deleteOneViewField",
    description: `Delete One viewField`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/viewFields/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneViewField", {
    name: "UpdateOneViewField",
    description: `Update One viewField`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"isVisible":{"type":"boolean","description":"View Field visibility"},"viewId":{"type":"string","format":"uuid"},"aggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"position":{"type":"number","description":"View Field position"},"size":{"type":"number","description":"View Field size"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Field target field"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/viewFields/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findViewFieldDuplicates", {
    name: "findViewFieldDuplicates",
    description: `**depth** can be provided to request your **viewField**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"(System) View Fields","properties":{"isVisible":{"type":"boolean","description":"View Field visibility"},"viewId":{"type":"string","format":"uuid"},"aggregateOperation":{"type":"string","enum":["AVG","COUNT","MAX","MIN","SUM","COUNT_EMPTY","COUNT_NOT_EMPTY","COUNT_UNIQUE_VALUES","PERCENTAGE_EMPTY","PERCENTAGE_NOT_EMPTY","COUNT_TRUE","COUNT_FALSE"],"description":"Optional aggregate operation"},"position":{"type":"number","description":"View Field position"},"size":{"type":"number","description":"View Field size"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Field target field"}},"required":["fieldMetadataId"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewFields/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // ViewFilter tools
  ["findManyViewFilters", {
    name: "findManyViewFilters",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **viewFilters**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/viewFilters",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneViewFilter", {
    name: "createOneViewFilter",
    description: `Create One viewFilter`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"viewId":{"type":"string","format":"uuid"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Filter target field"},"operand":{"type":"string","description":"View Filter operand"},"value":{"type":"string","description":"View Filter value"},"displayValue":{"type":"string","description":"View Filter Display Value"},"viewFilterGroupId":{"type":"string","format":"uuid","description":"View Filter Group"},"positionInViewFilterGroup":{"type":"number","description":"Position in the view filter group"},"subFieldName":{"type":"string","description":"Sub field name"}},"required":["fieldMetadataId"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewFilters",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyViewFilters", {
    name: "createManyViewFilters",
    description: `Create Many viewFilters`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"(System) View Filters","properties":{"viewId":{"type":"string","format":"uuid"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Filter target field"},"operand":{"type":"string","description":"View Filter operand"},"value":{"type":"string","description":"View Filter value"},"displayValue":{"type":"string","description":"View Filter Display Value"},"viewFilterGroupId":{"type":"string","format":"uuid","description":"View Filter Group"},"positionInViewFilterGroup":{"type":"number","description":"Position in the view filter group"},"subFieldName":{"type":"string","description":"Sub field name"}},"required":["fieldMetadataId"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/viewFilters",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneViewFilter", {
    name: "findOneViewFilter",
    description: `**depth** can be provided to request your **viewFilter**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/viewFilters/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneViewFilter", {
    name: "deleteOneViewFilter",
    description: `Delete One viewFilter`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/viewFilters/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneViewFilter", {
    name: "UpdateOneViewFilter",
    description: `Update One viewFilter`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"viewId":{"type":"string","format":"uuid"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Filter target field"},"operand":{"type":"string","description":"View Filter operand"},"value":{"type":"string","description":"View Filter value"},"displayValue":{"type":"string","description":"View Filter Display Value"},"viewFilterGroupId":{"type":"string","format":"uuid","description":"View Filter Group"},"positionInViewFilterGroup":{"type":"number","description":"Position in the view filter group"},"subFieldName":{"type":"string","description":"Sub field name"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/viewFilters/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findViewFilterDuplicates", {
    name: "findViewFilterDuplicates",
    description: `**depth** can be provided to request your **viewFilter**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"(System) View Filters","properties":{"viewId":{"type":"string","format":"uuid"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Filter target field"},"operand":{"type":"string","description":"View Filter operand"},"value":{"type":"string","description":"View Filter value"},"displayValue":{"type":"string","description":"View Filter Display Value"},"viewFilterGroupId":{"type":"string","format":"uuid","description":"View Filter Group"},"positionInViewFilterGroup":{"type":"number","description":"Position in the view filter group"},"subFieldName":{"type":"string","description":"Sub field name"}},"required":["fieldMetadataId"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewFilters/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
]);