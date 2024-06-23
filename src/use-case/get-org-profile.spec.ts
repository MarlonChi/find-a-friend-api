import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetOrgProfileUseCase } from "./get-org-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { generateOrg } from "@/utils/tests/generateOrg";

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

describe("Get Org Profile Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);
  });

  it("should be able to get org profile", async () => {
    const createOrg = await orgsRepository.create(
      generateOrg({ password: await hash("123456", 6) })
    );

    const { org } = await sut.execute({
      orgId: createOrg.id,
    });

    expect(org.email).toEqual(createOrg.email);
  });

  it("should not be able to get org profile with wrong id", async () => {
    expect(() =>
      sut.execute({
        orgId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
