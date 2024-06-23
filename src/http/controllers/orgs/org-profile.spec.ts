import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateOrg } from "@/utils/tests/generateOrg";

describe("Org Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get org profile", async () => {
    const createOrg = generateOrg();

    await request(app.server).post("/orgs").send(createOrg);

    const authResponse = await request(app.server).post("/sessions").send({
      email: createOrg.email,
      password: createOrg.password,
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/org-profile")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: createOrg.email,
      })
    );
  });
});
