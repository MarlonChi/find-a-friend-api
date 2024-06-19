import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetUseCase } from "./get-pet";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

describe("Get Pet Use Case", () => {
  let petsRepository: InMemoryPetsRepository;
  let sut: GetPetUseCase;

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get a new pet", async () => {
    const createPet = await petsRepository.create({
      name: "Apollo",
      about: "Amoroso",
      age: "1 ano",
      size: "Médio",
      energy_level: "Alta",
      environment: "Apartamento",
      org_id: "123",
    });

    const pet = await sut.execute({ id: createPet.id });

    console.log(pet);

    expect(pet.pet.id).toEqual(expect.any(String));
  });

  it("should not be able to get a non-existing pet", async () => {
    await expect(sut.execute({ id: "non-existing" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
