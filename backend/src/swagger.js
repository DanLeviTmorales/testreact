import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD Backend API",
      version: "1.0.0",
      description: "API REST para gestionar items (CRUD)",
    },
    servers: [{ url: "/api", description: "Servidor API" }],
    components: {
      schemas: {
        Item: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Tarea 1" },
            description: { type: "string", example: "Descripción de la tarea" },
          },
        },
        ItemInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Tarea 1" },
            description: { type: "string", example: "Descripción de la tarea" },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string", example: "Item no encontrado" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
