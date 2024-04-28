import { Note, PrismaClient } from "@prisma/client";
import { noteFactory } from "./factory";
const prisma = new PrismaClient();
export async function seedNotes() {
  const notes: Note[] = noteFactory.buildList(10);

  const insertedNotes = await prisma.note.createMany({
    data: notes,
    skipDuplicates: true,
  });
  console.log({ insertedNotes });
}
