import { PrismaClient } from "@prisma/client";
import { initialUser } from "./data";
const prisma = new PrismaClient();

export async function seedUsers() {
  const createUser = await prisma.user.upsert({
    where: { id: initialUser.id },
    create: initialUser,
    update: {},
  });
  console.log({ createUser });
}
