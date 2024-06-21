import { ResourceNotFoundError } from "@/use-case/errors/resource-not-found-error";
import { MakeCreatePetUseCase } from "@/use-case/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
  energy_level: z.string(),
  environment: z.string(),
});

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const body = bodySchema.parse(request.body);

  const createPetUseCase = MakeCreatePetUseCase();

  const org_id = request.user.sub;

  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id });

    return reply.status(200).send(pet);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send({ message: "Internal server error" });
  }
}
