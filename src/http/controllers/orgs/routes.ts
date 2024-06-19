import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { createOrg } from "./create-org";
import { authenticate } from "./authenticate";
import { orgProfile } from "./org-profile";
import { refresh } from "./refresh";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  app.get("/org-profile", { onRequest: [verifyJWT] }, orgProfile);
}
