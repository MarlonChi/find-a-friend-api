import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { createPet } from "./create-pet";
import { getPet } from "./get-pet";
import { searchPets } from "./search-pets";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pet", { onRequest: [verifyJWT] }, createPet);
  app.get("/pet/:id", getPet);
  app.get("/pets", searchPets);
}
