import { McpToolDefinition, ToolDefinitionMap } from './types.js';

/**
 * Workflow & Automation tool definitions
 * Includes Workflow, WorkflowRun, WorkflowVersion, WorkflowAutomatedTrigger tools
 */
export const workflowToolDefinitions: ToolDefinitionMap = new Map([
  // WorkflowAutomatedTrigger tools
  ["findManyWorkflowAutomatedTriggers", {
    name: "findManyWorkflowAutomatedTriggers",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **workflowAutomatedTriggers**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/workflowAutomatedTriggers",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneWorkflowAutomatedTrigger", {
    name: "createOneWorkflowAutomatedTrigger",
    description: `Create One workflowAutomatedTrigger`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"settings":{"type":"object","description":"The workflow automated trigger settings"},"type":{"type":"string","enum":["DATABASE_EVENT","CRON"],"description":"The workflow automated trigger type"},"workflowId":{"type":"string","format":"uuid"}},"required":["settings","type"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflowAutomatedTriggers",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyWorkflowAutomatedTriggers", {
    name: "createManyWorkflowAutomatedTriggers",
    description: `Create Many workflowAutomatedTriggers`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A workflow automated trigger","properties":{"settings":{"type":"object","description":"The workflow automated trigger settings"},"type":{"type":"string","enum":["DATABASE_EVENT","CRON"],"description":"The workflow automated trigger type"},"workflowId":{"type":"string","format":"uuid"}},"required":["settings","type"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/workflowAutomatedTriggers",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneWorkflowAutomatedTrigger", {
    name: "findOneWorkflowAutomatedTrigger",
    description: `**depth** can be provided to request your **workflowAutomatedTrigger**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/workflowAutomatedTriggers/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneWorkflowAutomatedTrigger", {
    name: "deleteOneWorkflowAutomatedTrigger",
    description: `Delete One workflowAutomatedTrigger`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/workflowAutomatedTriggers/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneWorkflowAutomatedTrigger", {
    name: "UpdateOneWorkflowAutomatedTrigger",
    description: `Update One workflowAutomatedTrigger`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"settings":{"type":"object","description":"The workflow automated trigger settings"},"type":{"type":"string","enum":["DATABASE_EVENT","CRON"],"description":"The workflow automated trigger type"},"workflowId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/workflowAutomatedTriggers/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findWorkflowAutomatedTriggerDuplicates", {
    name: "findWorkflowAutomatedTriggerDuplicates",
    description: `**depth** can be provided to request your **workflowAutomatedTrigger**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A workflow automated trigger","properties":{"settings":{"type":"object","description":"The workflow automated trigger settings"},"type":{"type":"string","enum":["DATABASE_EVENT","CRON"],"description":"The workflow automated trigger type"},"workflowId":{"type":"string","format":"uuid"}},"required":["settings","type"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflowAutomatedTriggers/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // WorkflowRun tools  
  ["findManyWorkflowRuns", {
    name: "findManyWorkflowRuns",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **workflowRuns**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/workflowRuns",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneWorkflowRun", {
    name: "createOneWorkflowRun",
    description: `Create One workflowRun`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Workflow run position"},"state":{"type":"object","description":"State of the workflow run"},"workflowVersionId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"Name of the workflow run"},"startedAt":{"type":"string","format":"date-time","description":"Workflow run started at"},"endedAt":{"type":"string","format":"date-time","description":"Workflow run ended at"},"status":{"type":"string","enum":["NOT_STARTED","RUNNING","COMPLETED","FAILED","ENQUEUED"],"description":"Workflow run status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The executor of the workflow"},"workflowId":{"type":"string","format":"uuid"}},"required":["state"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflowRuns",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyWorkflowRuns", {
    name: "createManyWorkflowRuns",
    description: `Create Many workflowRuns`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A workflow run","properties":{"position":{"type":"number","description":"Workflow run position"},"state":{"type":"object","description":"State of the workflow run"},"workflowVersionId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"Name of the workflow run"},"startedAt":{"type":"string","format":"date-time","description":"Workflow run started at"},"endedAt":{"type":"string","format":"date-time","description":"Workflow run ended at"},"status":{"type":"string","enum":["NOT_STARTED","RUNNING","COMPLETED","FAILED","ENQUEUED"],"description":"Workflow run status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The executor of the workflow"},"workflowId":{"type":"string","format":"uuid"}},"required":["state"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/workflowRuns",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneWorkflowRun", {
    name: "findOneWorkflowRun",
    description: `**depth** can be provided to request your **workflowRun**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/workflowRuns/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneWorkflowRun", {
    name: "deleteOneWorkflowRun",
    description: `Delete One workflowRun`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/workflowRuns/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneWorkflowRun", {
    name: "UpdateOneWorkflowRun",
    description: `Update One workflowRun`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Workflow run position"},"state":{"type":"object","description":"State of the workflow run"},"workflowVersionId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"Name of the workflow run"},"startedAt":{"type":"string","format":"date-time","description":"Workflow run started at"},"endedAt":{"type":"string","format":"date-time","description":"Workflow run ended at"},"status":{"type":"string","enum":["NOT_STARTED","RUNNING","COMPLETED","FAILED","ENQUEUED"],"description":"Workflow run status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The executor of the workflow"},"workflowId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/workflowRuns/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findWorkflowRunDuplicates", {
    name: "findWorkflowRunDuplicates",
    description: `**depth** can be provided to request your **workflowRun**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A workflow run","properties":{"position":{"type":"number","description":"Workflow run position"},"state":{"type":"object","description":"State of the workflow run"},"workflowVersionId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"Name of the workflow run"},"startedAt":{"type":"string","format":"date-time","description":"Workflow run started at"},"endedAt":{"type":"string","format":"date-time","description":"Workflow run ended at"},"status":{"type":"string","enum":["NOT_STARTED","RUNNING","COMPLETED","FAILED","ENQUEUED"],"description":"Workflow run status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The executor of the workflow"},"workflowId":{"type":"string","format":"uuid"}},"required":["state"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflowRuns/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // Workflow tools
  ["findManyWorkflows", {
    name: "findManyWorkflows",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **workflows**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/workflows",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneWorkflow", {
    name: "createOneWorkflow",
    description: `Create One workflow`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"statuses":{"type":"array","items":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED"]},"description":"The current statuses of the workflow versions"},"lastPublishedVersionId":{"type":"string","description":"The workflow last published version id"},"name":{"type":"string","description":"The workflow name"},"position":{"type":"number","description":"Workflow record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflows",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyWorkflows", {
    name: "createManyWorkflows",
    description: `Create Many workflows`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A workflow","properties":{"statuses":{"type":"array","items":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED"]},"description":"The current statuses of the workflow versions"},"lastPublishedVersionId":{"type":"string","description":"The workflow last published version id"},"name":{"type":"string","description":"The workflow name"},"position":{"type":"number","description":"Workflow record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/workflows",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneWorkflow", {
    name: "findOneWorkflow",
    description: `**depth** can be provided to request your **workflow**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/workflows/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneWorkflow", {
    name: "deleteOneWorkflow",
    description: `Delete One workflow`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/workflows/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneWorkflow", {
    name: "UpdateOneWorkflow",
    description: `Update One workflow`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"statuses":{"type":"array","items":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED"]},"description":"The current statuses of the workflow versions"},"lastPublishedVersionId":{"type":"string","description":"The workflow last published version id"},"name":{"type":"string","description":"The workflow name"},"position":{"type":"number","description":"Workflow record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/workflows/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findWorkflowDuplicates", {
    name: "findWorkflowDuplicates",
    description: `**depth** can be provided to request your **workflow**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A workflow","properties":{"statuses":{"type":"array","items":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED"]},"description":"The current statuses of the workflow versions"},"lastPublishedVersionId":{"type":"string","description":"The workflow last published version id"},"name":{"type":"string","description":"The workflow name"},"position":{"type":"number","description":"Workflow record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflows/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // WorkflowVersion tools
  ["findManyWorkflowVersions", {
    name: "findManyWorkflowVersions",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **workflowVersions**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/workflowVersions",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneWorkflowVersion", {
    name: "createOneWorkflowVersion",
    description: `Create One workflowVersion`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"workflowId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"The workflow version name"},"trigger":{"type":"object","description":"Json object to provide trigger"},"steps":{"type":"object","description":"Json object to provide steps"},"status":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED","ARCHIVED"],"description":"The workflow version status"},"position":{"type":"number","description":"Workflow version position"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflowVersions",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyWorkflowVersions", {
    name: "createManyWorkflowVersions",
    description: `Create Many workflowVersions`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A workflow version","properties":{"workflowId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"The workflow version name"},"trigger":{"type":"object","description":"Json object to provide trigger"},"steps":{"type":"object","description":"Json object to provide steps"},"status":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED","ARCHIVED"],"description":"The workflow version status"},"position":{"type":"number","description":"Workflow version position"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/workflowVersions",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneWorkflowVersion", {
    name: "findOneWorkflowVersion",
    description: `**depth** can be provided to request your **workflowVersion**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/workflowVersions/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneWorkflowVersion", {
    name: "deleteOneWorkflowVersion",
    description: `Delete One workflowVersion`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/workflowVersions/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneWorkflowVersion", {
    name: "UpdateOneWorkflowVersion",
    description: `Update One workflowVersion`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"workflowId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"The workflow version name"},"trigger":{"type":"object","description":"Json object to provide trigger"},"steps":{"type":"object","description":"Json object to provide steps"},"status":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED","ARCHIVED"],"description":"The workflow version status"},"position":{"type":"number","description":"Workflow version position"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/workflowVersions/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findWorkflowVersionDuplicates", {
    name: "findWorkflowVersionDuplicates",
    description: `**depth** can be provided to request your **workflowVersion**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A workflow version","properties":{"workflowId":{"type":"string","format":"uuid"},"name":{"type":"string","description":"The workflow version name"},"trigger":{"type":"object","description":"Json object to provide trigger"},"steps":{"type":"object","description":"Json object to provide steps"},"status":{"type":"string","enum":["DRAFT","ACTIVE","DEACTIVATED","ARCHIVED"],"description":"The workflow version status"},"position":{"type":"number","description":"Workflow version position"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/workflowVersions/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
]);