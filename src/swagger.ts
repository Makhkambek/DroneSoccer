import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DroneSoccer API",
      version: "1.0.0",
      description: "Backend API for DroneSoccer platform — courses, lessons, applications, shop",
    },
    servers: [
      { url: "http://localhost:4000", description: "Development" },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export function setupSwagger(app: Express): void {
  const spec = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec, {
    customSiteTitle: "DroneSoccer API Docs",
  }));
  app.get("/api/docs.json", (_req, res) => res.json(spec));
}
