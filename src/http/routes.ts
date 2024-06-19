import { FastifyInstance } from "fastify";

import { createOrg } from "./controllers/create-org";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);
  app.post("/sessions", authenticate);
}
