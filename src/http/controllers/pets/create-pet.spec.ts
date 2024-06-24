import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateOrg } from "@/utils/tests/generateOrg";
import { generatePet } from "@/utils/tests/generatePet";

describe("Create pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a new pet", async () => {
    const org = generateOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    const response = await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet());

    expect(response.status).toBe(200);
  });
});
