import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

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

  const password_hash = await hash(body.password, 6);

  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email: body.email,
    },
  });

  if (orgWithSameEmail) {
    return reply.status(409).send();
  }

  await prisma.org.create({
    data: { ...body, password: password_hash },
  });
}
