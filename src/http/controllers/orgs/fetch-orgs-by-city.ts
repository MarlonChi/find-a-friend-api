import { MakeFetchOrgByCityUseCase } from "@/use-case/factories/make-fetch-org-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const querySchema = z.object({
  city: z.string(),
});

export async function fetchOrgsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = querySchema.parse(request.query);

  const fetchOrgsByCityUseCase = MakeFetchOrgByCityUseCase();

  try {
    const { orgs } = await fetchOrgsByCityUseCase.execute({
      city: query.city,
    });

    return reply.status(200).send({ orgs });
  } catch (err) {
    return reply.status(500).send({ message: "Internal server error" });
  }
}
