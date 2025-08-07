#!/usr/bin/env node
/**
 * MCP Server generated from OpenAPI spec for twenty-mcp-server vv0.1
 * Generated on: 2025-08-07T08:25:00.671Z
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest
} from "@modelcontextprotocol/sdk/types.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

/**
 * Type definition for JSON objects
 */
type JsonObject = Record<string, any>;

/**
 * Interface for MCP Tool Definition
 */
interface McpToolDefinition {
    name: string;
    description: string;
    inputSchema: any;
    method: string;
    pathTemplate: string;
    executionParameters: { name: string, in: string }[];
    requestBodyContentType?: string;
    securityRequirements: any[];
}

/**
 * Server configuration
 */
export const SERVER_NAME = "twenty-mcp-server";
export const SERVER_VERSION = "v0.1";
export const API_BASE_URL = "https://crm.kipotsdam.de/rest";

/**
 * MCP Server instance
 */
const server = new Server(
    { name: SERVER_NAME, version: SERVER_VERSION },
    { capabilities: { tools: {} } }
);

/**
 * Map of tool definitions by name
 */
const toolDefinitionMap: Map<string, McpToolDefinition> = new Map([

  ["GetOpenApiSchema", {
    name: "GetOpenApiSchema",
    description: `Get Open Api Schema`,
    inputSchema: {"type":"object","properties":{}},
    method: "get",
    pathTemplate: "/open-api/core",
    executionParameters: [],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
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
  }],
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
  }],
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
  }],
  ["findManyNotes", {
    name: "findManyNotes",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **notes**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/notes",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneNote", {
    name: "createOneNote",
    description: `Create One note`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Note record position"},"title":{"type":"string","description":"Note title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Note body"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/notes",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyNotes", {
    name: "createManyNotes",
    description: `Create Many notes`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A note","properties":{"position":{"type":"number","description":"Note record position"},"title":{"type":"string","description":"Note title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Note body"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/notes",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneNote", {
    name: "findOneNote",
    description: `**depth** can be provided to request your **note**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/notes/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneNote", {
    name: "deleteOneNote",
    description: `Delete One note`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/notes/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneNote", {
    name: "UpdateOneNote",
    description: `Update One note`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"position":{"type":"number","description":"Note record position"},"title":{"type":"string","description":"Note title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Note body"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/notes/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findNoteDuplicates", {
    name: "findNoteDuplicates",
    description: `**depth** can be provided to request your **note**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A note","properties":{"position":{"type":"number","description":"Note record position"},"title":{"type":"string","description":"Note title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Note body"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/notes/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findManyNoteTargets", {
    name: "findManyNoteTargets",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **noteTargets**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/noteTargets",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneNoteTarget", {
    name: "createOneNoteTarget",
    description: `Create One noteTarget`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/noteTargets",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyNoteTargets", {
    name: "createManyNoteTargets",
    description: `Create Many noteTargets`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A note target","properties":{"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/noteTargets",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneNoteTarget", {
    name: "findOneNoteTarget",
    description: `**depth** can be provided to request your **noteTarget**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/noteTargets/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneNoteTarget", {
    name: "deleteOneNoteTarget",
    description: `Delete One noteTarget`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/noteTargets/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneNoteTarget", {
    name: "UpdateOneNoteTarget",
    description: `Update One noteTarget`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/noteTargets/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findNoteTargetDuplicates", {
    name: "findNoteTargetDuplicates",
    description: `**depth** can be provided to request your **noteTarget**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A note target","properties":{"companyId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"noteId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/noteTargets/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
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
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact’s avatar"},"city":{"type":"string","description":"Contact’s city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact’s phone numbers"},"jobTitle":{"type":"string","description":"Contact’s job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact’s Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact’s name"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/people",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyPeople", {
    name: "createManyPeople",
    description: `Create Many people`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A person","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact’s avatar"},"city":{"type":"string","description":"Contact’s city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact’s phone numbers"},"jobTitle":{"type":"string","description":"Contact’s job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact’s Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact’s name"}}},"description":"The JSON request body."}},"required":["requestBody"]},
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
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact’s avatar"},"city":{"type":"string","description":"Contact’s city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact’s phone numbers"},"jobTitle":{"type":"string","description":"Contact’s job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact’s Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact’s name"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/people/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findPersonDuplicates", {
    name: "findPersonDuplicates",
    description: `**depth** can be provided to request your **person**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A person","properties":{"companyId":{"type":"string","format":"uuid"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"},"position":{"type":"number","description":"Person record Position"},"avatarUrl":{"type":"string","description":"Contact’s avatar"},"city":{"type":"string","description":"Contact’s city"},"phones":{"properties":{"additionalPhones":{"type":"array","items":{"type":"string"}},"primaryPhoneCountryCode":{"type":"string"},"primaryPhoneCallingCode":{"type":"string"},"primaryPhoneNumber":{"type":"string"}},"type":"object","description":"Contact’s phone numbers"},"jobTitle":{"type":"string","description":"Contact’s job title"},"xLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s X/Twitter account"},"linkedinLink":{"type":"object","properties":{"primaryLinkLabel":{"type":"string"},"primaryLinkUrl":{"type":"string"},"secondaryLinks":{"type":"array","items":{"type":"object","description":"A secondary link","properties":{"url":{"type":"string","format":"uri"},"label":{"type":"string"}}}}},"description":"Contact’s Linkedin account"},"emails":{"type":"object","properties":{"primaryEmail":{"type":"string"},"additionalEmails":{"type":"array","items":{"type":"string","format":"email"}}},"description":"Contact’s Emails"},"name":{"type":"object","properties":{"firstName":{"type":"string"},"lastName":{"type":"string"}},"description":"Contact’s name"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/people/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findManyTasks", {
    name: "findManyTasks",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **tasks**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/tasks",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneTask", {
    name: "createOneTask",
    description: `Create One task`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"assigneeId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"Task record position"},"title":{"type":"string","description":"Task title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Task body"},"dueAt":{"type":"string","format":"date-time","description":"Task due date"},"status":{"type":"string","enum":["TODO","IN_PROGRESS","DONE"],"description":"Task status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/tasks",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyTasks", {
    name: "createManyTasks",
    description: `Create Many tasks`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A task","properties":{"assigneeId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"Task record position"},"title":{"type":"string","description":"Task title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Task body"},"dueAt":{"type":"string","format":"date-time","description":"Task due date"},"status":{"type":"string","enum":["TODO","IN_PROGRESS","DONE"],"description":"Task status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/tasks",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneTask", {
    name: "findOneTask",
    description: `**depth** can be provided to request your **task**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/tasks/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneTask", {
    name: "deleteOneTask",
    description: `Delete One task`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/tasks/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneTask", {
    name: "UpdateOneTask",
    description: `Update One task`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"assigneeId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"Task record position"},"title":{"type":"string","description":"Task title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Task body"},"dueAt":{"type":"string","format":"date-time","description":"Task due date"},"status":{"type":"string","enum":["TODO","IN_PROGRESS","DONE"],"description":"Task status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/tasks/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findTaskDuplicates", {
    name: "findTaskDuplicates",
    description: `**depth** can be provided to request your **task**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A task","properties":{"assigneeId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"Task record position"},"title":{"type":"string","description":"Task title"},"bodyV2":{"type":"object","properties":{"blocknote":{"type":"string"},"markdown":{"type":"string"}},"description":"Task body"},"dueAt":{"type":"string","format":"date-time","description":"Task due date"},"status":{"type":"string","enum":["TODO","IN_PROGRESS","DONE"],"description":"Task status"},"createdBy":{"type":"object","properties":{"source":{"type":"string","enum":["EMAIL","CALENDAR","WORKFLOW","API","IMPORT","MANUAL","SYSTEM","WEBHOOK"]}},"description":"The creator of the record"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/tasks/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findManyTaskTargets", {
    name: "findManyTaskTargets",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **taskTargets**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/taskTargets",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneTaskTarget", {
    name: "createOneTaskTarget",
    description: `Create One taskTarget`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"taskId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/taskTargets",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyTaskTargets", {
    name: "createManyTaskTargets",
    description: `Create Many taskTargets`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"A task target","properties":{"taskId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/taskTargets",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneTaskTarget", {
    name: "findOneTaskTarget",
    description: `**depth** can be provided to request your **taskTarget**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/taskTargets/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneTaskTarget", {
    name: "deleteOneTaskTarget",
    description: `Delete One taskTarget`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/taskTargets/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneTaskTarget", {
    name: "UpdateOneTaskTarget",
    description: `Update One taskTarget`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"taskId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/taskTargets/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findTaskTargetDuplicates", {
    name: "findTaskTargetDuplicates",
    description: `**depth** can be provided to request your **taskTarget**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"A task target","properties":{"taskId":{"type":"string","format":"uuid"},"personId":{"type":"string","format":"uuid"},"companyId":{"type":"string","format":"uuid"},"opportunityId":{"type":"string","format":"uuid"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/taskTargets/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
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
  ["findManyViewFilterGroups", {
    name: "findManyViewFilterGroups",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **viewFilterGroups**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/viewFilterGroups",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneViewFilterGroup", {
    name: "createOneViewFilterGroup",
    description: `Create One viewFilterGroup`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"positionInViewFilterGroup":{"type":"number","description":"Position in the parent view filter group"},"logicalOperator":{"type":"string","enum":["AND","OR","NOT"],"description":"Logical operator for the filter group"},"parentViewFilterGroupId":{"type":"string","format":"uuid","description":"Parent View Filter Group"},"viewId":{"type":"string","format":"uuid"}}}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewFilterGroups",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyViewFilterGroups", {
    name: "createManyViewFilterGroups",
    description: `Create Many viewFilterGroups`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"(System) View Filter Groups","properties":{"positionInViewFilterGroup":{"type":"number","description":"Position in the parent view filter group"},"logicalOperator":{"type":"string","enum":["AND","OR","NOT"],"description":"Logical operator for the filter group"},"parentViewFilterGroupId":{"type":"string","format":"uuid","description":"Parent View Filter Group"},"viewId":{"type":"string","format":"uuid"}}},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/viewFilterGroups",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneViewFilterGroup", {
    name: "findOneViewFilterGroup",
    description: `**depth** can be provided to request your **viewFilterGroup**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/viewFilterGroups/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneViewFilterGroup", {
    name: "deleteOneViewFilterGroup",
    description: `Delete One viewFilterGroup`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/viewFilterGroups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneViewFilterGroup", {
    name: "UpdateOneViewFilterGroup",
    description: `Update One viewFilterGroup`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"positionInViewFilterGroup":{"type":"number","description":"Position in the parent view filter group"},"logicalOperator":{"type":"string","enum":["AND","OR","NOT"],"description":"Logical operator for the filter group"},"parentViewFilterGroupId":{"type":"string","format":"uuid","description":"Parent View Filter Group"},"viewId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/viewFilterGroups/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findViewFilterGroupDuplicates", {
    name: "findViewFilterGroupDuplicates",
    description: `**depth** can be provided to request your **viewFilterGroup**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"(System) View Filter Groups","properties":{"positionInViewFilterGroup":{"type":"number","description":"Position in the parent view filter group"},"logicalOperator":{"type":"string","enum":["AND","OR","NOT"],"description":"Logical operator for the filter group"},"parentViewFilterGroupId":{"type":"string","format":"uuid","description":"Parent View Filter Group"},"viewId":{"type":"string","format":"uuid"}}}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewFilterGroups/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
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
  ["findManyViewGroups", {
    name: "findManyViewGroups",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **viewGroups**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/viewGroups",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneViewGroup", {
    name: "createOneViewGroup",
    description: `Create One viewGroup`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"fieldValue":{"type":"string","description":"Group by this field value"},"viewId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"View Field position"},"isVisible":{"type":"boolean","description":"View Group visibility"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Group target field"}},"required":["fieldMetadataId"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewGroups",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyViewGroups", {
    name: "createManyViewGroups",
    description: `Create Many viewGroups`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"(System) View Groups","properties":{"fieldValue":{"type":"string","description":"Group by this field value"},"viewId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"View Field position"},"isVisible":{"type":"boolean","description":"View Group visibility"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Group target field"}},"required":["fieldMetadataId"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/viewGroups",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneViewGroup", {
    name: "findOneViewGroup",
    description: `**depth** can be provided to request your **viewGroup**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/viewGroups/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneViewGroup", {
    name: "deleteOneViewGroup",
    description: `Delete One viewGroup`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/viewGroups/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneViewGroup", {
    name: "UpdateOneViewGroup",
    description: `Update One viewGroup`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"fieldValue":{"type":"string","description":"Group by this field value"},"viewId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"View Field position"},"isVisible":{"type":"boolean","description":"View Group visibility"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Group target field"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/viewGroups/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findViewGroupDuplicates", {
    name: "findViewGroupDuplicates",
    description: `**depth** can be provided to request your **viewGroup**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"(System) View Groups","properties":{"fieldValue":{"type":"string","description":"Group by this field value"},"viewId":{"type":"string","format":"uuid"},"position":{"type":"number","description":"View Field position"},"isVisible":{"type":"boolean","description":"View Group visibility"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Group target field"}},"required":["fieldMetadataId"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewGroups/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
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
  ["findManyViewSorts", {
    name: "findManyViewSorts",
    description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **viewSorts**`,
    inputSchema: {"type":"object","properties":{"order_by":{"type":"string","description":"Sorts objects returned.  \n    Should have the following shape: **field_name_1,field_name_2[DIRECTION_2],...**  \n    Available directions are **AscNullsFirst**, **AscNullsLast**, **DescNullsFirst**, **DescNullsLast**.  \n    Default direction is **AscNullsFirst**"},"filter":{"type":"string","description":"Filters objects returned.  \n    Should have the following shape: **field_1[COMPARATOR]:value_1,field_2[COMPARATOR]:value_2...\n    To filter on composite type fields use **field.subField[COMPARATOR]:value_1\n    **\n    Available comparators are **eq**, **neq**, **in**, **containsAny**, **is**, **gt**, **gte**, **lt**, **lte**, **startsWith**, **like**, **ilike**.  \n    You can create more complex filters using conjunctions **or**, **and**, **not**.  \n    Default root conjunction is **and**.  \n    To filter **null** values use **field[is]:NULL** or **field[is]:NOT_NULL**  \n    To filter using **boolean** values use **field[eq]:true** or **field[eq]:false**"},"limit":{"type":"number","minimum":0,"maximum":60,"default":60,"description":"Limits the number of objects returned."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"starting_after":{"type":"string","description":"Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"},"ending_before":{"type":"string","description":"Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data"}}},
    method: "get",
    pathTemplate: "/viewSorts",
    executionParameters: [{"name":"order_by","in":"query"},{"name":"filter","in":"query"},{"name":"limit","in":"query"},{"name":"depth","in":"query"},{"name":"starting_after","in":"query"},{"name":"ending_before","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createOneViewSort", {
    name: "createOneViewSort",
    description: `Create One viewSort`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"direction":{"type":"string","description":"View Sort direction"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Sort target field"},"viewId":{"type":"string","format":"uuid"}},"required":["fieldMetadataId"]}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewSorts",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["createManyViewSorts", {
    name: "createManyViewSorts",
    description: `Create Many viewSorts`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"array","items":{"type":"object","description":"(System) View Sorts","properties":{"direction":{"type":"string","description":"View Sort direction"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Sort target field"},"viewId":{"type":"string","format":"uuid"}},"required":["fieldMetadataId"]},"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/batch/viewSorts",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findOneViewSort", {
    name: "findOneViewSort",
    description: `**depth** can be provided to request your **viewSort**`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."}},"required":["id"]},
    method: "get",
    pathTemplate: "/viewSorts/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["deleteOneViewSort", {
    name: "deleteOneViewSort",
    description: `Delete One viewSort`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."}},"required":["id"]},
    method: "delete",
    pathTemplate: "/viewSorts/{id}",
    executionParameters: [{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["UpdateOneViewSort", {
    name: "UpdateOneViewSort",
    description: `Update One viewSort`,
    inputSchema: {"type":"object","properties":{"id":{"type":"string","format":"uuid","description":"Object id."},"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","description":"body","properties":{"direction":{"type":"string","description":"View Sort direction"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Sort target field"},"viewId":{"type":"string","format":"uuid"}}}},"required":["id","requestBody"]},
    method: "patch",
    pathTemplate: "/viewSorts/{id}",
    executionParameters: [{"name":"id","in":"path"},{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
  ["findViewSortDuplicates", {
    name: "findViewSortDuplicates",
    description: `**depth** can be provided to request your **viewSort**`,
    inputSchema: {"type":"object","properties":{"depth":{"type":"number","enum":[0,1,2],"default":1,"description":"Determines the level of nested related objects to include in the response.  \n    - 0: Returns only the primary object's information.  \n    - 1: Returns the primary object along with its directly related objects (with no additional nesting for related objects).  \n    - 2: Returns the primary object, its directly related objects, and the related objects of those related objects."},"requestBody":{"type":"object","properties":{"data":{"type":"array","items":{"type":"object","description":"(System) View Sorts","properties":{"direction":{"type":"string","description":"View Sort direction"},"fieldMetadataId":{"type":"string","format":"uuid","description":"View Sort target field"},"viewId":{"type":"string","format":"uuid"}},"required":["fieldMetadataId"]}},"ids":{"type":"array","items":{"type":"string","format":"uuid"}}},"description":"body"}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/viewSorts/duplicates",
    executionParameters: [{"name":"depth","in":"query"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"bearerAuth":[]}]
  }],
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
]);

/**
 * Security schemes from the OpenAPI spec
 */
const securitySchemes =   {
    "bearerAuth": {
      "type": "http",
      "scheme": "bearer",
      "bearerFormat": "JWT",
      "description": "Enter the token with the `Bearer: ` prefix, e.g. \"Bearer abcde12345\"."
    }
  };


server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolsForClient: Tool[] = Array.from(toolDefinitionMap.values()).map(def => ({
    name: def.name,
    description: def.description,
    inputSchema: def.inputSchema
  }));
  return { tools: toolsForClient };
});


server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
  const { name: toolName, arguments: toolArgs } = request.params;
  const toolDefinition = toolDefinitionMap.get(toolName);
  if (!toolDefinition) {
    console.error(`Error: Unknown tool requested: ${toolName}`);
    return { content: [{ type: "text", text: `Error: Unknown tool requested: ${toolName}` }] };
  }
  return await executeApiTool(toolName, toolDefinition, toolArgs ?? {}, securitySchemes);
});



/**
 * Type definition for cached OAuth tokens
 */
interface TokenCacheEntry {
    token: string;
    expiresAt: number;
}

/**
 * Declare global __oauthTokenCache property for TypeScript
 */
declare global {
    var __oauthTokenCache: Record<string, TokenCacheEntry> | undefined;
}

/**
 * Acquires an OAuth2 token using client credentials flow
 * 
 * @param schemeName Name of the security scheme
 * @param scheme OAuth2 security scheme
 * @returns Acquired token or null if unable to acquire
 */
async function acquireOAuth2Token(schemeName: string, scheme: any): Promise<string | null | undefined> {
    try {
        // Check if we have the necessary credentials
        const clientId = process.env[`OAUTH_CLIENT_ID_SCHEMENAME`];
        const clientSecret = process.env[`OAUTH_CLIENT_SECRET_SCHEMENAME`];
        const scopes = process.env[`OAUTH_SCOPES_SCHEMENAME`];
        
        if (!clientId || !clientSecret) {
            console.error(`Missing client credentials for OAuth2 scheme '${schemeName}'`);
            return null;
        }
        
        // Initialize token cache if needed
        if (typeof global.__oauthTokenCache === 'undefined') {
            global.__oauthTokenCache = {};
        }
        
        // Check if we have a cached token
        const cacheKey = `${schemeName}_${clientId}`;
        const cachedToken = global.__oauthTokenCache[cacheKey];
        const now = Date.now();
        
        if (cachedToken && cachedToken.expiresAt > now) {
            console.error(`Using cached OAuth2 token for '${schemeName}' (expires in ${Math.floor((cachedToken.expiresAt - now) / 1000)} seconds)`);
            return cachedToken.token;
        }
        
        // Determine token URL based on flow type
        let tokenUrl = '';
        if (scheme.flows?.clientCredentials?.tokenUrl) {
            tokenUrl = scheme.flows.clientCredentials.tokenUrl;
            console.error(`Using client credentials flow for '${schemeName}'`);
        } else if (scheme.flows?.password?.tokenUrl) {
            tokenUrl = scheme.flows.password.tokenUrl;
            console.error(`Using password flow for '${schemeName}'`);
        } else {
            console.error(`No supported OAuth2 flow found for '${schemeName}'`);
            return null;
        }
        
        // Prepare the token request
        let formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        
        // Add scopes if specified
        if (scopes) {
            formData.append('scope', scopes);
        }
        
        console.error(`Requesting OAuth2 token from ${tokenUrl}`);
        
        // Make the token request
        const response = await axios({
            method: 'POST',
            url: tokenUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            data: formData.toString()
        });
        
        // Process the response
        if (response.data?.access_token) {
            const token = response.data.access_token;
            const expiresIn = response.data.expires_in || 3600; // Default to 1 hour
            
            // Cache the token
            global.__oauthTokenCache[cacheKey] = {
                token,
                expiresAt: now + (expiresIn * 1000) - 60000 // Expire 1 minute early
            };
            
            console.error(`Successfully acquired OAuth2 token for '${schemeName}' (expires in ${expiresIn} seconds)`);
            return token;
        } else {
            console.error(`Failed to acquire OAuth2 token for '${schemeName}': No access_token in response`);
            return null;
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error acquiring OAuth2 token for '${schemeName}':`, errorMessage);
        return null;
    }
}


/**
 * Executes an API tool with the provided arguments
 * 
 * @param toolName Name of the tool to execute
 * @param definition Tool definition
 * @param toolArgs Arguments provided by the user
 * @param allSecuritySchemes Security schemes from the OpenAPI spec
 * @returns Call tool result
 */
async function executeApiTool(
    toolName: string,
    definition: McpToolDefinition,
    toolArgs: JsonObject,
    allSecuritySchemes: Record<string, any>
): Promise<CallToolResult> {
  try {
    // Validate arguments against the input schema
    let validatedArgs: JsonObject;
    try {
        const zodSchema = getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
        const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
        validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ')}`;
            return { content: [{ type: 'text', text: validationErrorMessage }] };
        } else {
             const errorMessage = error instanceof Error ? error.message : String(error);
             return { content: [{ type: 'text', text: `Internal error during validation setup: ${errorMessage}` }] };
        }
    }

    // Prepare URL, query parameters, headers, and request body
    let urlPath = definition.pathTemplate;
    const queryParams: Record<string, any> = {};
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    let requestBodyData: any = undefined;

    // Apply parameters to the URL path, query, or headers
    definition.executionParameters.forEach((param) => {
        const value = validatedArgs[param.name];
        if (typeof value !== 'undefined' && value !== null) {
            if (param.in === 'path') {
                urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(String(value)));
            }
            else if (param.in === 'query') {
                queryParams[param.name] = value;
            }
            else if (param.in === 'header') {
                headers[param.name.toLowerCase()] = String(value);
            }
        }
    });

    // Ensure all path parameters are resolved
    if (urlPath.includes('{')) {
        throw new Error(`Failed to resolve path parameters: ${urlPath}`);
    }
    
    // Construct the full URL
    const requestUrl = API_BASE_URL ? `${API_BASE_URL}${urlPath}` : urlPath;

    // Handle request body if needed
    if (definition.requestBodyContentType && typeof validatedArgs['requestBody'] !== 'undefined') {
        requestBodyData = validatedArgs['requestBody'];
        headers['content-type'] = definition.requestBodyContentType;
    }


    // Apply security requirements if available
    // Security requirements use OR between array items and AND within each object
    const appliedSecurity = definition.securityRequirements?.find(req => {
        // Try each security requirement (combined with OR)
        return Object.entries(req).every(([schemeName, scopesArray]) => {
            const scheme = allSecuritySchemes[schemeName];
            if (!scheme) return false;
            
            // API Key security (header, query, cookie)
            if (scheme.type === 'apiKey') {
                return !!process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            // HTTP security (basic, bearer)
            if (scheme.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    return !!process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    return !!process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] && 
                           !!process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
            }
            
            // OAuth2 security
            if (scheme.type === 'oauth2') {
                // Check for pre-existing token
                if (process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    return true;
                }
                
                // Check for client credentials for auto-acquisition
                if (process.env[`OAUTH_CLIENT_ID_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] &&
                    process.env[`OAUTH_CLIENT_SECRET_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    // Verify we have a supported flow
                    if (scheme.flows?.clientCredentials || scheme.flows?.password) {
                        return true;
                    }
                }
                
                return false;
            }
            
            // OpenID Connect
            if (scheme.type === 'openIdConnect') {
                return !!process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            return false;
        });
    });

    // If we found matching security scheme(s), apply them
    if (appliedSecurity) {
        // Apply each security scheme from this requirement (combined with AND)
        for (const [schemeName, scopesArray] of Object.entries(appliedSecurity)) {
            const scheme = allSecuritySchemes[schemeName];
            
            // API Key security
            if (scheme?.type === 'apiKey') {
                const apiKey = process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (apiKey) {
                    if (scheme.in === 'header') {
                        headers[scheme.name.toLowerCase()] = apiKey;
                        console.error(`Applied API key '${schemeName}' in header '${scheme.name}'`);
                    }
                    else if (scheme.in === 'query') {
                        queryParams[scheme.name] = apiKey;
                        console.error(`Applied API key '${schemeName}' in query parameter '${scheme.name}'`);
                    }
                    else if (scheme.in === 'cookie') {
                        // Add the cookie, preserving other cookies if they exist
                        headers['cookie'] = `${scheme.name}=${apiKey}${headers['cookie'] ? `; ${headers['cookie']}` : ''}`;
                        console.error(`Applied API key '${schemeName}' in cookie '${scheme.name}'`);
                    }
                }
            } 
            // HTTP security (Bearer or Basic)
            else if (scheme?.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    const token = process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (token) {
                        headers['authorization'] = `Bearer ${token}`;
                        console.error(`Applied Bearer token for '${schemeName}'`);
                    }
                } 
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    const username = process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    const password = process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (username && password) {
                        headers['authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
                        console.error(`Applied Basic authentication for '${schemeName}'`);
                    }
                }
            }
            // OAuth2 security
            else if (scheme?.type === 'oauth2') {
                // First try to use a pre-provided token
                let token = process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                
                // If no token but we have client credentials, try to acquire a token
                if (!token && (scheme.flows?.clientCredentials || scheme.flows?.password)) {
                    console.error(`Attempting to acquire OAuth token for '${schemeName}'`);
                    token = (await acquireOAuth2Token(schemeName, scheme)) ?? '';
                }
                
                // Apply token if available
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OAuth2 token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
            // OpenID Connect
            else if (scheme?.type === 'openIdConnect') {
                const token = process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OpenID Connect token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
        }
    } 
    // Log warning if security is required but not available
    else if (definition.securityRequirements?.length > 0) {
        // First generate a more readable representation of the security requirements
        const securityRequirementsString = definition.securityRequirements
            .map(req => {
                const parts = Object.entries(req)
                    .map(([name, scopesArray]) => {
                        const scopes = scopesArray as string[];
                        if (scopes.length === 0) return name;
                        return `${name} (scopes: ${scopes.join(', ')})`;
                    })
                    .join(' AND ');
                return `[${parts}]`;
            })
            .join(' OR ');
            
        console.warn(`Tool '${toolName}' requires security: ${securityRequirementsString}, but no suitable credentials found.`);
    }
    

    // Prepare the axios request configuration
    const config: AxiosRequestConfig = {
      method: definition.method.toUpperCase(), 
      url: requestUrl, 
      params: queryParams, 
      headers: headers,
      ...(requestBodyData !== undefined && { data: requestBodyData }),
    };

    // Log request info to stderr (doesn't affect MCP output)
    console.error(`Executing tool "${toolName}": ${config.method} ${config.url}`);
    
    // Execute the request
    const response = await axios(config);

    // Process and format the response
    let responseText = '';
    const contentType = response.headers['content-type']?.toLowerCase() || '';
    
    // Handle JSON responses
    if (contentType.includes('application/json') && typeof response.data === 'object' && response.data !== null) {
         try { 
             responseText = JSON.stringify(response.data, null, 2); 
         } catch (e) { 
             responseText = "[Stringify Error]"; 
         }
    } 
    // Handle string responses
    else if (typeof response.data === 'string') { 
         responseText = response.data; 
    }
    // Handle other response types
    else if (response.data !== undefined && response.data !== null) { 
         responseText = String(response.data); 
    }
    // Handle empty responses
    else { 
         responseText = `(Status: ${response.status} - No body content)`; 
    }
    
    // Return formatted response
    return { 
        content: [ 
            { 
                type: "text", 
                text: `API Response (Status: ${response.status}):\n${responseText}` 
            } 
        ], 
    };

  } catch (error: unknown) {
    // Handle errors during execution
    let errorMessage: string;
    
    // Format Axios errors specially
    if (axios.isAxiosError(error)) { 
        errorMessage = formatApiError(error); 
    }
    // Handle standard errors
    else if (error instanceof Error) { 
        errorMessage = error.message; 
    }
    // Handle unexpected error types
    else { 
        errorMessage = 'Unexpected error: ' + String(error); 
    }
    
    // Log error to stderr
    console.error(`Error during execution of tool '${toolName}':`, errorMessage);
    
    // Return error message to client
    return { content: [{ type: "text", text: errorMessage }] };
  }
}


/**
 * Main function to start the server
 */
async function main() {
// Set up stdio transport
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`${SERVER_NAME} MCP Server (v${SERVER_VERSION}) running on stdio${API_BASE_URL ? `, proxying API at ${API_BASE_URL}` : ''}`);
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
    console.error("Shutting down MCP server...");
    process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the server
main().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});

/**
 * Formats API errors for better readability
 * 
 * @param error Axios error
 * @returns Formatted error message
 */
function formatApiError(error: AxiosError): string {
    let message = 'API request failed.';
    if (error.response) {
        message = `API Error: Status ${error.response.status} (${error.response.statusText || 'Status text not available'}). `;
        const responseData = error.response.data;
        const MAX_LEN = 200;
        if (typeof responseData === 'string') { 
            message += `Response: ${responseData.substring(0, MAX_LEN)}${responseData.length > MAX_LEN ? '...' : ''}`; 
        }
        else if (responseData) { 
            try { 
                const jsonString = JSON.stringify(responseData); 
                message += `Response: ${jsonString.substring(0, MAX_LEN)}${jsonString.length > MAX_LEN ? '...' : ''}`; 
            } catch { 
                message += 'Response: [Could not serialize data]'; 
            } 
        }
        else { 
            message += 'No response body received.'; 
        }
    } else if (error.request) {
        message = 'API Network Error: No response received from server.';
        if (error.code) message += ` (Code: ${error.code})`;
    } else { 
        message += `API Request Setup Error: ${error.message}`; 
    }
    return message;
}

/**
 * Converts a JSON Schema to a Zod schema for runtime validation
 * 
 * @param jsonSchema JSON Schema
 * @param toolName Tool name for error reporting
 * @returns Zod schema
 */
function getZodSchemaFromJsonSchema(jsonSchema: any, toolName: string): z.ZodTypeAny {
    if (typeof jsonSchema !== 'object' || jsonSchema === null) { 
        return z.object({}).passthrough(); 
    }
    try {
        const zodSchemaString = jsonSchemaToZod(jsonSchema);
        const zodSchema = eval(zodSchemaString);
        if (typeof zodSchema?.parse !== 'function') { 
            throw new Error('Eval did not produce a valid Zod schema.'); 
        }
        return zodSchema as z.ZodTypeAny;
    } catch (err: any) {
        console.error(`Failed to generate/evaluate Zod schema for '${toolName}':`, err);
        return z.object({}).passthrough();
    }
}
