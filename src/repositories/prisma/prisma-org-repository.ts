import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findById(id: string) {
    const org = await prisma.org.findFirst({
      where: {
        id,
      },
    });

    return org;
  }

  async findManyByCity(city: string) {
    const org = await prisma.org.findMany({
      where: {
        city,
      },
    });

    return org;
  }
}
