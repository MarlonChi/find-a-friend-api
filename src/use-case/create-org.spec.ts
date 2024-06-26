import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { generateOrg } from "@/utils/tests/generateOrg";

describe("Create Org Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: CreateOrgUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create a new org", async () => {
    const { org } = await sut.execute(generateOrg());

    expect(orgsRepository.items).toHaveLength(1);
    expect(org.id).toEqual(expect.any(String));
  });
});
