import { PrismaClient } from "@prisma/client";
import { initialUser } from "./data";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function seedUsers() {
  const password = await bcrypt.hash(initialUser.password, 10);
  const createUser = await prisma.user.upsert({
    where: { id: initialUser.id },
    create: { ...initialUser, password },
    update: {},
  });
  console.log({ createUser });
}
