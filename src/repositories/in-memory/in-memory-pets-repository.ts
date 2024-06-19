import { Pet, Prisma } from "@prisma/client";
import crypto from "node:crypto";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }
}
