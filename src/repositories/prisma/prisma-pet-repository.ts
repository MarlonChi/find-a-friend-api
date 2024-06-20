import { Pet, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FindAllParams, PetsRepository } from "../pets-repository";

export class PrismaPetRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    return pet;
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        environment: params.environment,
        org: {
          city: {
            contains: params.city,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }
}
