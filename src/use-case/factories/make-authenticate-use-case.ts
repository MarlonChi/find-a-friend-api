import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { AuthenticateUseCase } from "../authenticate";

export function MakeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository);

  return authenticateUseCase;
}
