import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetUseCase } from "./search-pets";
import { generateOrg } from "@/utils/tests/generateOrg";
import { generatePet } from "@/utils/tests/generatePet";

describe("Search Pets Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: SearchPetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new SearchPetUseCase(petsRepository);
  });

  it("should be able to search pets by city", async () => {
    const createOrg = await orgsRepository.create(generateOrg());
    const createOrg2 = await orgsRepository.create(generateOrg());

    await petsRepository.create(generatePet({ org_id: createOrg.id }));
    await petsRepository.create(generatePet({ org_id: createOrg.id }));
    await petsRepository.create(generatePet({ org_id: createOrg2.id }));

    const { pets } = await sut.execute({ city: createOrg.city });

    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({ city: createOrg2.city });

    expect(pets2).toHaveLength(1);
  });

  it("should be able to search pets by city and age", async () => {
    const createOrg = await orgsRepository.create(generateOrg());

    await petsRepository.create(
      generatePet({ org_id: createOrg.id, age: "1" })
    );
    await petsRepository.create(generatePet({ org_id: createOrg.id }));

    const { pets } = await sut.execute({ city: createOrg.city, age: "1" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
    const createOrg = await orgsRepository.create(generateOrg());

    await petsRepository.create(
      generatePet({ org_id: createOrg.id, size: "small" })
    );
    await petsRepository.create(
      generatePet({ org_id: createOrg.id, size: "medium" })
    );

    const { pets } = await sut.execute({ city: createOrg.city, size: "small" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energy_level", async () => {
    const createOrg = await orgsRepository.create(generateOrg());

    await petsRepository.create(
      generatePet({ org_id: createOrg.id, energy_level: "high" })
    );
    await petsRepository.create(
      generatePet({ org_id: createOrg.id, energy_level: "low" })
    );

    const { pets } = await sut.execute({
      city: createOrg.city,
      energy_level: "low",
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and environment", async () => {
    const createOrg = await orgsRepository.create(generateOrg());

    await petsRepository.create(
      generatePet({ org_id: createOrg.id, environment: "indoor" })
    );

    const { pets } = await sut.execute({
      city: createOrg.city,
      environment: "indoor",
    });

    // expect(pets).toHaveLength(1);
  });
});
