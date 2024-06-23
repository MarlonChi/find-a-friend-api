import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchOrgByCityUseCase } from "./fetch-org-by-city";
import { generateOrg } from "@/utils/tests/generateOrg";

describe("Fetch Orgs By City Use Case", () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: FetchOrgByCityUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchOrgByCityUseCase(orgsRepository);
  });

  it("should be able to fetch org by city", async () => {
    const org = await orgsRepository.create(generateOrg());

    const orgsByCity = await sut.execute({
      city: org.city,
    });

    expect(orgsByCity.orgs).toEqual([org]);
  });
});
