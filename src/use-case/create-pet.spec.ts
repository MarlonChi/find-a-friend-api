import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { generateOrg } from "@/utils/tests/generateOrg";
import { generatePet } from "@/utils/tests/generatePet";

describe("Create Pet Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetUseCase(orgsRepository, petsRepository);
  });

  it("should be able to create a pet", async () => {
    const createOrg = await orgsRepository.create(generateOrg());

    const { pet } = await sut.execute(generatePet({ org_id: createOrg.id }));

    expect(pet.id).toEqual(expect.any(String));
  });
});
