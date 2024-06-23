import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateOrg } from "@/utils/tests/generateOrg";
describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    const createOrg = generateOrg();

    await request(app.server).post("/orgs").send(createOrg);

    const response = await request(app.server).post("/sessions").send({
      email: createOrg.email,
      password: createOrg.password,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
