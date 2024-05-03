import { prisma } from "../../storage/prisma";
import { CreateUserBody } from "./user.schema";

export async function createUser(data: CreateUserBody) {
  const user = await prisma.user.create({ data });
  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      created_at: true,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
