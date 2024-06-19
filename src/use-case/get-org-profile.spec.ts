import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetOrgProfileUseCase } from "./get-org-profile";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

describe("Get Org Profile Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);
  });

  it("should be able to get org profile", async () => {
    const createOrg = await orgsRepository.create({
      author_name: faker.person.fullName(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      email: "johndoe@example.com",
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      name: faker.company.name(),
      neighborhood: faker.location.streetAddress(),
      password: await hash("123456", 6),
      state: faker.location.state(),
      street: faker.location.street(),
      whatsapp: faker.phone.number(),
    });

    const { org } = await sut.execute({
      orgId: createOrg.id,
    });

    console.log(org);

    expect(org.email).toEqual("johndoe@example.com");
  });

  it("should not be able to get org profile with wrong id", async () => {
    expect(() =>
      sut.execute({
        orgId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
