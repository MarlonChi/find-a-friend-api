import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { generateOrg } from "@/utils/tests/generateOrg";
import { generatePet } from "@/utils/tests/generatePet";

describe("Search Pets (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets by city", async () => {
    const org = generateOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet());

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet());

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
    const org = generateOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet());

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet({ age: "1" }));

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, age: "1" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and size", async () => {
    const org = generateOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet({ size: "medium" }));

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet({ size: "large" }));

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet({ size: "small" }));

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, size: "small" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and energy level", async () => {
    const org = generateOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet({ energy_level: "high" }));

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet({ energy_level: "low" }));

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, energy_level: "low" });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and environment", async () => {
    const org = generateOrg();

    await request(app.server).post("/orgs").send(org);

    const authResponse = await request(app.server)
      .post("/sessions")
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send(generatePet({ environment: "outdoor" }));

    const response = await request(app.server)
      .get("/pets")
      .query({ city: org.city, environment: "outdoor" });

    expect(response.status).toBe(200);
    // expect(response.body.pets).toHaveLength(1);
  });

  it("should be able to search pets by city and all filters", async () => {
    const org = generateOrg();

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
