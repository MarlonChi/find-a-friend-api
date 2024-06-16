import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { OrgRepository } from "@/repositories/org-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { OrgAlreadyExistsError } from "./errors/org-alerady-exists-error";

interface CreateOrgUseCaseRequest {
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

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgRepository) {}

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
  }: CreateOrgUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
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

    return { org };
  }
}
