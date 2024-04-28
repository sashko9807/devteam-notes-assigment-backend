import { faker } from "@faker-js/faker";
import { seedNotes } from "./notes/seed";
import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./user/seed";

const prisma = new PrismaClient();

async function main() {
  faker.seed(1);
  await seedUsers();
  await seedNotes();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
