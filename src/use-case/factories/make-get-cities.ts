import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { GetCitiesUseCase } from "../get-cities";

export function MakeGetCities() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const getCitiesUseCase = new GetCitiesUseCase(prismaOrgsRepository);

  return getCitiesUseCase;
}
