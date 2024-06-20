import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../create-pet";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";

export function MakeCreatePetUseCase() {
  const prismaPetsRepository = new PrismaPetRepository();
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const createPetUseCase = new CreatePetUseCase(
    prismaOrgsRepository,
    prismaPetsRepository
  );

  return createPetUseCase;
}
