import { faker } from "@faker-js/faker";
import crypto from "node:crypto";

interface GenerateOrgProps {
  password?: string;
}

export function generateOrg(overwrite?: GenerateOrgProps) {
  return {
    id: crypto.randomUUID(),
    author_name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    email: faker.internet.email(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    name: faker.company.name(),
    neighborhood: faker.location.streetAddress(),
    password: overwrite?.password ?? faker.internet.password(),
    state: faker.location.state(),
    street: faker.location.street(),
    whatsapp: faker.phone.number(),
  };
}
