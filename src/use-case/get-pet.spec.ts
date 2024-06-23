import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetUseCase } from "./get-pet";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { generatePet } from "@/utils/tests/generatePet";

describe("Get Pet Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: GetPetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get a new pet", async () => {
    const createPet = await petsRepository.create(
      generatePet({ org_id: "123" })
    );

    const pet = await sut.execute({ id: createPet.id });

    expect(pet.pet.id).toEqual(expect.any(String));
  });

  it("should not be able to get a non-existing pet", async () => {
    await expect(sut.execute({ id: "non-existing" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
