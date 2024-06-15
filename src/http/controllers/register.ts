import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const body = registerBodySchema.parse(request.body);

  await prisma.org.create({
    data: body,
  });
}
