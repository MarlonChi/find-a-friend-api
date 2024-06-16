import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

describe("Create Org Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: CreateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create a new org", async () => {
    const { org } = await sut.execute({
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

    console.log(org);

    expect(orgsRepository.items).toHaveLength(1);
    expect(org.id).toEqual(expect.any(String));
  });
});
