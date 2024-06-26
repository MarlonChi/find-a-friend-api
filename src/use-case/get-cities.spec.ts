import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { generateOrg } from "@/utils/tests/generateOrg";
import { GetCitiesUseCase } from "./get-cities";

describe("Get Cities Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: GetCitiesUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetCitiesUseCase(orgsRepository);
  });

  it("should be able to Get Cities", async () => {
    await orgsRepository.create(generateOrg());
    await orgsRepository.create(generateOrg());

    const cities = await sut.execute();

    expect(cities.cities).toHaveLength(2);
  });
});
