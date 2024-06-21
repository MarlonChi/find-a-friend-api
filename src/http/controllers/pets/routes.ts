import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { createPet } from "./create-pet";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pet", { onRequest: [verifyJWT] }, createPet);
}
