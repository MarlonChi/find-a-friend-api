import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository";
import { FetchOrgByCityUseCase } from "../fetch-org-by-city";

export function MakeFetchOrgByCityUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const fetchOrgByCityUseCase = new FetchOrgByCityUseCase(prismaOrgsRepository);

  return fetchOrgByCityUseCase;
}
