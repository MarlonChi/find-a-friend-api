import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { generateOrg } from "@/utils/tests/generateOrg";

describe("Authenticate Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    const createOrg = await orgsRepository.create(
      generateOrg({ password: await hash("123456", 6) })
    );

    const { org } = await sut.execute({
      email: createOrg.email,
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

    await orgsRepository.create(
      generateOrg({ password: await hash("123456", 6) })
    );

    expect(() =>
      sut.execute({ email: "johndoe@example.com", password: "654321" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
