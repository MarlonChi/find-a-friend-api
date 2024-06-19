import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const sut = new AuthenticateUseCase(orgsRepository);

    await orgsRepository.create({
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
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const sut = new AuthenticateUseCase(orgsRepository);

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const sut = new AuthenticateUseCase(orgsRepository);

    await orgsRepository.create({
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

    expect(() =>
      sut.execute({ email: "johndoe@example.com", password: "654321" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
