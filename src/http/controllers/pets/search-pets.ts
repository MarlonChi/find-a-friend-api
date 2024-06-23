import { MakeSearchPetUseCase } from "@/use-case/factories/make-search-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
});

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const { city, age, size, energy_level, environment } = querySchema.parse(
    request.query
  );

  const searchPetsUseCase = MakeSearchPetUseCase();

  try {
    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    console.error(err);

    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
