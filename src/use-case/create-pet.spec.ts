import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { faker } from "@faker-js/faker";
import { Decimal } from "@prisma/client/runtime/library";

describe("Create Pet Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(orgsRepository, petsRepository);
  });

  it("should be able to create a pet", async () => {
    orgsRepository.items.push({
      id: "123",
      author_name: faker.person.fullName(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      email: faker.internet.email(),
      latitude: new Decimal(faker.location.latitude()),
      longitude: new Decimal(faker.location.longitude()),
      name: faker.company.name(),
      neighborhood: faker.location.streetAddress(),
      password: faker.internet.password(),
      state: faker.location.state(),
      street: faker.location.street(),
      whatsapp: faker.phone.number(),
    });

    const { pet } = await sut.execute({
      name: "Apollo",
      about: "Amoroso",
      age: "1 ano",
      size: "Médio",
      energy_level: "Alta",
      environment: "Apartamento",
      org_id: "123",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
