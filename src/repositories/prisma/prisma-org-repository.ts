import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { OrgRepository } from "../org-repository";

export class PrismaOrgsRepository implements OrgRepository {
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
}
