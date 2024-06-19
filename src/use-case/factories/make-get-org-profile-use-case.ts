import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { GetOrgProfileUseCase } from "../get-org-profile";

export function makeGetOrgProfileUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const useCase = new GetOrgProfileUseCase(prismaOrgsRepository);

  return useCase;
}
