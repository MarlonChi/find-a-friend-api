import { app } from "@/app";
import { generateOrg } from "@/utils/tests/generateOrg";
import { generatePet } from "@/utils/tests/generatePet";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should get a pet", async () => {
    const org = generateOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    const response = await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet());

    const getPetResponse = await request(app.server)
      .get(`/pet/${response.body.id}`)
      .set("Authorization", `Bearer ${authResponse.body.token}`);

    expect(getPetResponse.status).toBe(200);
  });
});
