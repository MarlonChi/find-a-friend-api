import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { CreateOrgUseCase } from "../create-org";

export function MakeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository);

  return createOrgUseCase;
}
