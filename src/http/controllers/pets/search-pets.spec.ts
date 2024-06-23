import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";

describe("Search Pets (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets by city", async () => {
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
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
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

    await request(app.server)
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

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  it("should not be able to search pets without city", async () => {
    const response = await request(app.server).get("/pets");

    expect(response.status).toBe(400);
  });

  it("should be able to search pets by city and age", async () => {
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
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Bud",
        about: "Calmo",
        age: "1",
        size: "medium",
        energy_level: "low",
        environment: "outdoor",
      });

    await request(app.server)
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

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, age: "1" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
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
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Bud",
        about: "Calmo",
        age: "5 meses",
        size: "small",
        energy_level: "low",
        environment: "outdoor",
      });

    await request(app.server)
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

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Bud",
        about: "Calmo",
        age: "5 meses",
        size: "large",
        energy_level: "low",
        environment: "outdoor",
      });

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, size: "small" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energy level", async () => {
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
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Bud",
        about: "Calmo",
        age: "5 meses",
        size: "large",
        energy_level: "low",
        environment: "outdoor",
      });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Bud",
        about: "Calmo",
        age: "5 meses",
        size: "large",
        energy_level: "medium",
        environment: "outdoor",
      });

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, energy_level: "low" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and environment", async () => {
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
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        name: "Bud",
        about: "Calmo",
        age: "5 meses",
        size: "large",
        energy_level: "medium",
        environment: "indoor",
      });

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, environment: "indoor" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and all filters", async () => {
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
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    const pets = [
      {
        name: "Bud",
        about: "Calmo",
        age: "1",
        size: "small",
        energy_level: "low",
        environment: "indoor",
      },
      {
        name: "Bud",
        about: "Calmo",
        age: "2",
        size: "medium",
        energy_level: "medium",
        environment: "outdoor",
      },
      {
        name: "Bud",
        about: "Calmo",
        age: "1",
        size: "large",
        energy_level: "high",
        environment: "indoor",
      },
      {
        name: "Bud",
        about: "Calmo",
        age: "4",
        size: "small",
        energy_level: "low",
        environment: "outdoor",
      },
      {
        name: "Bud",
        about: "Calmo",
        age: "5",
        size: "medium",
        energy_level: "medium",
        environment: "indoor",
      },
    ];

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post("/pet")
          .set("Authorization", `Bearer ${authResponse.body.token}`)
          .send(pet)
      )
    );

    let response = await request(app.server).get("/pets").query({
      city: org.city,
      age: "1",
      size: "small",
      energy_level: "low",
      environment: "indoor",
    });

    expect(response.body.pets).toHaveLength(1);

    response = await request(app.server).get("/pets").query({
      city: org.city,
      size: "medium",
    });

    expect(response.body.pets).toHaveLength(2);

    response = await request(app.server).get("/pets").query({
      city: org.city,
      energy_level: "low",
    });

    expect(response.body.pets).toHaveLength(2);
  });
});
