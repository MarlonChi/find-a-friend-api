import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchOrgByCityUseCase } from "./fetch-org-by-city";
import { faker } from "@faker-js/faker";

describe("Fetch Orgs By City Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: FetchOrgByCityUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchOrgByCityUseCase(orgsRepository);
  });

  it("should be able to fetch org by city", async () => {
    const org = await orgsRepository.create({
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

    const orgsByCity = await sut.execute({
      city: org.city,
    });

    expect(orgsByCity.orgs).toEqual([org]);
  });
});
