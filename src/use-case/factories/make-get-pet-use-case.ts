import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { GetPetUseCase } from "../get-pet";

export function MakeGetPetByIdUseCase() {
  const prismaPetsRepository = new PrismaPetRepository();
  const getPetUseCase = new GetPetUseCase(prismaPetsRepository);

  return getPetUseCase;
}
