import { OrgsRepository } from "@/repositories/orgs-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class GetCitiesUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute() {
    const cities = await this.orgsRepository.getCities();

    if (!cities) {
      throw new ResourceNotFoundError();
    }

    return {
      cities,
    };
  }
}
