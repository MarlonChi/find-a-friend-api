import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { generateOrg } from "@/utils/tests/generateOrg";

describe("Get Cities (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get cities", async () => {
    const org1 = generateOrg();
    const org2 = generateOrg();

    await request(app.server).post("/orgs").send(org1).expect(201);
    await request(app.server).post("/orgs").send(org2).expect(201);

    const response = await request(app.server).get("/locales").expect(200);

    expect(response.body.cities).toHaveLength(2);
  });
});
