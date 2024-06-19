import { FastifyInstance } from "fastify";

import { createOrg } from "./create-org";
import { authenticate } from "./authenticate";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);
  app.post("/sessions", authenticate);
}
