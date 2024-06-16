import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-case/register";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { OrgAlreadyExistsError } from "@/use-case/errors/org-alerady-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
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

  const body = registerBodySchema.parse(request.body);

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const registerUseCase = new RegisterUseCase(prismaOrgsRepository);

    await registerUseCase.execute(body);
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      reply.status(409).send({
        message: err.message,
      });
    }

    reply.status(500).send();
  }

  return reply.status(201).send();
}
