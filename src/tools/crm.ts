import { McpToolDefinition, ToolDefinitionMap } from './types.js';

/**
 * CRM-related tool definitions for Companies, People, and Opportunities
 */
export const crmToolDefinitions: ToolDefinitionMap = new Map([
  // Company tools
  ["findManyCompanies", {
    name: "findManyCompanies",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **companies**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/companies",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneCompany", {
    name: "createOneCompany",
    description: `Create One company`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Company record position"},"idealCustomerProfile":{"type":"boolean","description":"Ideal Customer Profile:  Indicates whether the company is the most suitable and valuable customer for you"},"address":{"type":"object","properties":{"addressStreet1":{"type":"string"},"addressStreet2":{"type":"string"},"addressCity":{"type":"string"},"addressPostcode":{"type":"string"},"addressState":{"type":"string"},"addressCountry":{"type":"string"},"addressLat":{"type":"number"},"addressLng":{"type":"number"}},"description":"Address of the company"},"annualRecurringRevenue":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Annual Recurring Revenue: The actual or estimated annual revenue of the company"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Twitter/X account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Linkedin account"},"employees":{"type":"number","description":"Number of employees in the company"},"domainName":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company website URL. We use this url to fetch the company icon"},"name":{"type":"string","description":"The company name"},"accountOwnerId":{"type":"string","format":"uuid"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/companies",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyCompanies", {
    name: "createManyCompanies",
    description: `Create Many companies`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A company","properties":{"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Company record position"},"idealCustomerProfile":{"type":"boolean","description":"Ideal Customer Profile:  Indicates whether the company is the most suitable and valuable customer for you"},"address":{"type":"object","properties":{"addressStreet1":{"type":"string"},"addressStreet2":{"type":"string"},"addressCity":{"type":"string"},"addressPostcode":{"type":"string"},"addressState":{"type":"string"},"addressCountry":{"type":"string"},"addressLat":{"type":"number"},"addressLng":{"type":"number"}},"description":"Address of the company"},"annualRecurringRevenue":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Annual Recurring Revenue: The actual or estimated annual revenue of the company"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Twitter/X account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Linkedin account"},"employees":{"type":"number","description":"Number of employees in the company"},"domainName":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company website URL. We use this url to fetch the company icon"},"name":{"type":"string","description":"The company name"},"accountOwnerId":{"type":"string","format":"uuid"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/companies",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneCompany", {
    name: "findOneCompany",
    description: `**depth** can be provided to request your **company**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/companies/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneCompany", {
    name: "deleteOneCompany",
    description: `Delete One company`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/companies/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneCompany", {
    name: "UpdateOneCompany",
    description: `Update One company`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Company record position"},"idealCustomerProfile":{"type":"boolean","description":"Ideal Customer Profile:  Indicates whether the company is the most suitable and valuable customer for you"},"address":{"type":"object","properties":{"addressStreet1":{"type":"string"},"addressStreet2":{"type":"string"},"addressCity":{"type":"string"},"addressPostcode":{"type":"string"},"addressState":{"type":"string"},"addressCountry":{"type":"string"},"addressLat":{"type":"number"},"addressLng":{"type":"number"}},"description":"Address of the company"},"annualRecurringRevenue":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Annual Recurring Revenue: The actual or estimated annual revenue of the company"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Twitter/X account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Linkedin account"},"employees":{"type":"number","description":"Number of employees in the company"},"domainName":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company website URL. We use this url to fetch the company icon"},"name":{"type":"string","description":"The company name"},"accountOwnerId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/companies/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findCompanyDuplicates", {
    name: "findCompanyDuplicates",
    description: `**depth** can be provided to request your **company**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A company","properties":{"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Company record position"},"idealCustomerProfile":{"type":"boolean","description":"Ideal Customer Profile:  Indicates whether the company is the most suitable and valuable customer for you"},"address":{"type":"object","properties":{"addressStreet1":{"type":"string"},"addressStreet2":{"type":"string"},"addressCity":{"type":"string"},"addressPostcode":{"type":"string"},"addressState":{"type":"string"},"addressCountry":{"type":"string"},"addressLat":{"type":"number"},"addressLng":{"type":"number"}},"description":"Address of the company"},"annualRecurringRevenue":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Annual Recurring Revenue: The actual or estimated annual revenue of the company"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Twitter/X account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company Linkedin account"},"employees":{"type":"number","description":"Number of employees in the company"},"domainName":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"The company website URL. We use this url to fetch the company icon"},"name":{"type":"string","description":"The company name"},"accountOwnerId":{"type":"string","format":"uuid"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/companies/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // Opportunity tools
  ["findManyOpportunities", {
    name: "findManyOpportunities",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **opportunities**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/opportunities",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneOpportunity", {
    name: "createOneOpportunity",
    description: `Create One opportunity`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"name":{"type":"string","description":"The opportunity name"},"amount":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Opportunity amount"},"closeDate":{"type":"string","format":"date-time","description":"Opportunity close date"},"stage":{"type":"string","enum":["NEW","SCREENING","MEETING","PROPOSAL","CUSTOMER"],"description":"Opportunity stage"},"position":{"type":"number","description":"Opportunity record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"pointOfContactId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/opportunities",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyOpportunities", {
    name: "createManyOpportunities",
    description: `Create Many opportunities`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"An opportunity","properties":{"name":{"type":"string","description":"The opportunity name"},"amount":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Opportunity amount"},"closeDate":{"type":"string","format":"date-time","description":"Opportunity close date"},"stage":{"type":"string","enum":["NEW","SCREENING","MEETING","PROPOSAL","CUSTOMER"],"description":"Opportunity stage"},"position":{"type":"number","description":"Opportunity record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"pointOfContactId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/opportunities",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneOpportunity", {
    name: "findOneOpportunity",
    description: `**depth** can be provided to request your **opportunity**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/opportunities/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneOpportunity", {
    name: "deleteOneOpportunity",
    description: `Delete One opportunity`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/opportunities/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneOpportunity", {
    name: "UpdateOneOpportunity",
    description: `Update One opportunity`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"name":{"type":"string","description":"The opportunity name"},"amount":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Opportunity amount"},"closeDate":{"type":"string","format":"date-time","description":"Opportunity close date"},"stage":{"type":"string","enum":["NEW","SCREENING","MEETING","PROPOSAL","CUSTOMER"],"description":"Opportunity stage"},"position":{"type":"number","description":"Opportunity record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"pointOfContactId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/opportunities/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOpportunityDuplicates", {
    name: "findOpportunityDuplicates",
    description: `**depth** can be provided to request your **opportunity**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"An opportunity","properties":{"name":{"type":"string","description":"The opportunity name"},"amount":{"type":"object","properties":{"amountMicros":{"type":"number"},"currencyCode":{"type":"string"}},"description":"Opportunity amount"},"closeDate":{"type":"string","format":"date-time","description":"Opportunity close date"},"stage":{"type":"string","enum":["NEW","SCREENING","MEETING","PROPOSAL","CUSTOMER"],"description":"Opportunity stage"},"position":{"type":"number","description":"Opportunity record position"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"pointOfContactId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/opportunities/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],

  // People tools
  ["findManyPeople", {
    name: "findManyPeople",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **people**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/people",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOnePerson", {
    name: "createOnePerson",
    description: `Create One person`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact's avatar"},"city":{"type":"string","description":"Contact's city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact's phone numbers"},"jobTitle":{"type":"string","description":"Contact's job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact's Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact's name"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/people",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyPeople", {
    name: "createManyPeople",
    description: `Create Many people`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A person","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact's avatar"},"city":{"type":"string","description":"Contact's city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact's phone numbers"},"jobTitle":{"type":"string","description":"Contact's job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact's Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact's name"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/people",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOnePerson", {
    name: "findOnePerson",
    description: `**depth** can be provided to request your **person**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/people/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOnePerson", {
    name: "deleteOnePerson",
    description: `Delete One person`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/people/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOnePerson", {
    name: "UpdateOnePerson",
    description: `Update One person`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact's avatar"},"city":{"type":"string","description":"Contact's city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact's phone numbers"},"jobTitle":{"type":"string","description":"Contact's job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact's Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact's name"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/people/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findPersonDuplicates", {
    name: "findPersonDuplicates",
    description: `**depth** can be provided to request your **person**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A person","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact's avatar"},"city":{"type":"string","description":"Contact's city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact's phone numbers"},"jobTitle":{"type":"string","description":"Contact's job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact's Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact's Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact's name"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/people/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }]
]);