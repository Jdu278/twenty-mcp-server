/**
 * Security schemes from the OpenAPI spec
 */
export const securitySchemes = {
  "bearerAuth": {
    "type": "http",
    "scheme": "bearer",
    "bearerFormat": "JWT",
    "description": "Enter the token with the `Bearer: ` prefix, e.g. \"Bearer abcde12345\"."
  }
};
