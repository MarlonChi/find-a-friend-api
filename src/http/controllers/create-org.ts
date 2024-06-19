import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateOrgUseCase } from "@/use-case/create-org";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { OrgAlreadyExistsError } from "@/use-case/errors/org-alerady-exists-error";
import { MakeCreateOrgUseCase } from "@/use-case/factories/make-create-org-use-case";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const body = createOrgBodySchema.parse(request.body);

  try {
    const createOrgUseCase = MakeCreateOrgUseCase();

    await createOrgUseCase.execute(body);
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }

  return reply.status(201).send();
}
