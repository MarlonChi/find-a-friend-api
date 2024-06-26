import { MakeGetCities } from "@/use-case/factories/make-get-cities";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getCities(request: FastifyRequest, reply: FastifyReply) {
  const makeGetLocales = MakeGetCities();

  const { cities } = await makeGetLocales.execute();

  return reply.status(200).send({
    cities,
  });
}
