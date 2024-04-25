import prisma from "../db/prisma";
import bcrypt from "bcrypt";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createNewUser(email: string, password: string) {
  const saltRounds = 10;
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: passwordHashed,
    },
  });
  return user;
}

export async function updateUserPassword(
  email: string,
  updatedPassword: string
) {
  try {
    const hashedPassword = await bcrypt.hash(updatedPassword, 10);
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    return user;
  } catch (err) {
    return null;
  }
}
