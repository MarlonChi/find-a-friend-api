import { prisma } from "@/lib/prisma";
import { PrismaOrgsRepository } from "@/repositories/prisma-org-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

export class RegisterUseCase {
  constructor(private orgsRepository: any) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    if (orgWithSameEmail) {
      throw new Error("Email already used");
    }

    const prismaOrgRepository = new PrismaOrgsRepository();

    await prismaOrgRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    });
  }
}
