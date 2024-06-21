import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { faker } from "@faker-js/faker";

describe("Fetch Orgs By City (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch orgs by city", async () => {
    const org = {
      author_name: faker.person.fullName(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      email: faker.internet.email(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      name: faker.company.name(),
      neighborhood: faker.location.streetAddress(),
      password: faker.internet.password(),
      state: faker.location.state(),
      street: faker.location.street(),
      whatsapp: faker.phone.number(),
    };

    await request(app.server).post("/orgs").send(org).expect(201);

    const response = await request(app.server)
      .get("/orgs/by-city")
      .query({ city: org.city })
      .expect(200);

    expect(response.body.orgs).toHaveLength(1);
    expect(response.body.orgs[0].name).toEqual(org.name);
  });
});
