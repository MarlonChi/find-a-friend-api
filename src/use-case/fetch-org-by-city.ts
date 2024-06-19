import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface FetchOrgByCityUseCaseRequest {
  city: string;
}

interface FetchOrgByCityUseCaseResponse {
  orgs: Org[];
}

export class FetchOrgByCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
  }: FetchOrgByCityUseCaseRequest): Promise<FetchOrgByCityUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyByCity(city);

    return {
      orgs,
    };
  }
}
