import { ResourceNotFoundError } from "@/use-case/errors/resource-not-found-error";
import { MakeGetPetByIdUseCase } from "@/use-case/factories/make-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const routeSchema = z.object({
  id: z.string(),
});

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const { id } = routeSchema.parse(request.params);

  const getPetUseCase = MakeGetPetByIdUseCase();

  try {
    const { pet } = await getPetUseCase.execute({ id });

    return reply.status(200).send(pet);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(500).send({ message: "Internal server error" });
  }
}
