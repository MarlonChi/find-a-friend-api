import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { SearchPetUseCase } from "../search-pet";

export function MakeSearchPetUseCase() {
  const prismaPetsRepository = new PrismaPetRepository();
  const searchPetUseCase = new SearchPetUseCase(prismaPetsRepository);

  return searchPetUseCase;
}
