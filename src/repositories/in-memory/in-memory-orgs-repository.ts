import { Org, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import crypto from "node:crypto";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null;
  }

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findManyByCity(city: string) {
    return this.items.filter((org) => org.city === city);
  }
}
