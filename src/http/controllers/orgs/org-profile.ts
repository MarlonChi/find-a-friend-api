import { makeGetOrgProfileUseCase } from "@/use-case/factories/make-get-org-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function orgProfile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileUseCase();

  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  });

  return reply.status(200).send({
    org: {
      ...org,
      password: undefined,
    },
  });
}
