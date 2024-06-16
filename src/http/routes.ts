import { FastifyInstance } from "fastify";

import { createOrg } from "./controllers/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);
}
