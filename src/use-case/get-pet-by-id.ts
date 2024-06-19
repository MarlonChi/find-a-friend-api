import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetByidUseCaseRequest {
  id: string;
}

interface GetPetByIdUseCaseResponse {
  pet: Pet;
}

export default class GetPetByIdUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({ id }: GetPetByidUseCaseRequest) {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
