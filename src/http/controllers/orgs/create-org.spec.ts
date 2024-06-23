import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateOrg } from "@/utils/tests/generateOrg";
describe("Create Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create org", async () => {
    const createOrg = generateOrg();

    const response = await request(app.server).post("/orgs").send(createOrg);

    expect(response.statusCode).toEqual(201);
  });
});
