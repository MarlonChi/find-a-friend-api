import request from "supertest";
import { app } from "@/app";
import { faker } from "@faker-js/faker";
import { afterAll, beforeAll, describe, it } from "vitest";

describe("Create pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a new pet", async () => {
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

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/orgs/authenticate")
      .send({ email: org.email, password: org.password });

    const response = await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Bud",
        about: "Calmo",
        age: "5 meses",
        size: "medium",
        energy_level: "low",
        environment: "outdoor",
      });
  });
});
