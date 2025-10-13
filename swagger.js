import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "Documentação da API do Blog escolar",
    },
    servers: [
      { url: "http://localhost:3000" }, // URL base para testes locais
    ],
  },
  apis: ["./src/routes/*.js"], // onde buscar comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
