import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentação da API para gerenciamento de usuários",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["src/routes.ts"],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
