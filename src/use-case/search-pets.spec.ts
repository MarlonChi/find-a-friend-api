import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetUseCase } from "./search-pet";
import { faker } from "@faker-js/faker";

const makeOrg = {
  author_name: faker.person.fullName(),
  cep: faker.location.zipCode(),
  city: faker.location.city(),
  email: faker.internet.email(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  name: faker.company.name(),
  neighborhood: faker.location.streetAddress(),
  password: faker.internet.password(),
  state: faker.location.state(),
  street: faker.location.street(),
  whatsapp: faker.phone.number(),
};

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
    const createOrg = await orgsRepository.create(makeOrg);

    const createOrg2 = await orgsRepository.create({
      author_name: faker.person.fullName(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      email: faker.internet.email(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      name: faker.company.name(),
      neighborhood: faker.location.streetAddress(),
      password: faker.internet.password(),
      state: faker.location.state(),
      street: faker.location.street(),
      whatsapp: faker.phone.number(),
    });

    await petsRepository.create({
      name: "Apollo",
      about: "Amoroso",
      age: "1 ano",
      size: "Médio",
      energy_level: "Alta",
      environment: "Apartamento",
      org_id: createOrg.id,
    });

    await petsRepository.create({
      name: "Pandora",
      about: "Agitada",
      age: "2 anos",
      size: "Pequena",
      energy_level: "Alta",
      environment: "Apartamento",
      org_id: createOrg.id,
    });

    await petsRepository.create({
      name: "Bud",
      about: "Calmo",
      age: "5 meses",
      size: "Pequeno",
      energy_level: "Calmo",
      environment: "Quintal",
      org_id: createOrg2.id,
    });

    const { pets } = await sut.execute({ city: createOrg.city });

    expect(pets).toHaveLength(2);

    const { pets: pets2 } = await sut.execute({ city: createOrg2.city });

    expect(pets2).toHaveLength(1);
  });

  it("should be able to search pets by city and age", async () => {
    const createOrg = await orgsRepository.create(makeOrg);

    await petsRepository.create({
      name: "Apollo",
      about: "Amoroso",
      age: "1",
      size: "Médio",
      energy_level: "Alta",
      environment: "Apartamento",
      org_id: createOrg.id,
    });
    await petsRepository.create({
      name: "Bud",
      about: "Calmo",
      age: "5 meses",
      size: "Pequeno",
      energy_level: "Calmo",
      environment: "Quintal",
      org_id: createOrg.id,
    });

    const { pets } = await sut.execute({ city: createOrg.city, age: "1" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
    const createOrg = await orgsRepository.create(makeOrg);

    await petsRepository.create({
      name: "Apollo",
      about: "Amoroso",
      age: "1",
      size: "small",
      energy_level: "Alta",
      environment: "Apartamento",
      org_id: createOrg.id,
    });
    await petsRepository.create({
      name: "Bud",
      about: "Calmo",
      age: "5 meses",
      size: "medium",
      energy_level: "Calmo",
      environment: "Quintal",
      org_id: createOrg.id,
    });

    const { pets } = await sut.execute({ city: createOrg.city, size: "small" });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energy_level", async () => {
    const createOrg = await orgsRepository.create(makeOrg);

    await petsRepository.create({
      name: "Apollo",
      about: "Amoroso",
      age: "1",
      size: "small",
      energy_level: "high",
      environment: "Apartamento",
      org_id: createOrg.id,
    });
    await petsRepository.create({
      name: "Bud",
      about: "Calmo",
      age: "5 meses",
      size: "medium",
      energy_level: "low",
      environment: "Quintal",
      org_id: createOrg.id,
    });

    const { pets } = await sut.execute({
      city: createOrg.city,
      energy_level: "low",
    });

    expect(pets).toHaveLength(1);
  });

  it("should be able to search pets by city and environment", async () => {
    const createOrg = await orgsRepository.create(makeOrg);

    await petsRepository.create({
      name: "Apollo",
      about: "Amoroso",
      age: "1",
      size: "small",
      energy_level: "high",
      environment: "indoor",
      org_id: createOrg.id,
    });
    await petsRepository.create({
      name: "Bud",
      about: "Calmo",
      age: "5 meses",
      size: "medium",
      energy_level: "low",
      environment: "outdoor",
      org_id: createOrg.id,
    });

    const { pets } = await sut.execute({
      city: createOrg.city,
      environment: "indoor",
    });

    expect(pets).toHaveLength(1);
  });
});
