import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify();

const prisma = new PrismaClient();

prisma.org.create({
  data: {
    name: "Amigos",
    author_name: "Marlon",
    email: "org.amigos@teste.com",
    cep: "",
    city: "",
    latitude: 123,
    longitude: 123,
    neighborhood: "",
    password: "123",
    state: "RS",
    street: "",
    whatsapp: "999999999",
  },
});
