import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetUseCaseRequest {
  city: string;
  age?: string;
  size?: string;
  energy_level?: string;
  environment?: string;
}

interface SearchPetUseCaseResponse {
  pets: Pet[];
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energy_level,
      environment,
    });

    return { pets };
  }
}
