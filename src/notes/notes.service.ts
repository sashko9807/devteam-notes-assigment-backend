import prisma from "../db/prisma";
import { CreateNoteSchema } from "./schemas";

async function findByUserId(userId: string) {
  return await prisma.note.findMany({ where: { userId } });
}

async function create(data: CreateNoteSchema) {
  return await prisma.note.create({
    data: {
      userId: data.userId,
      description: data.content,
      title: data.title,
    },
  });
}

async function update(noteId: string, data: CreateNoteSchema) {
  return await prisma.note.update({
    where: { id: noteId },
    data: {
      userId: data.userId,
      description: data.content,
      title: data.title,
    },
  });
}

async function deleteNote(noteId: string, userId: string) {
  return await prisma.note.delete({ where: { id: noteId, userId } });
}

export const noteService = { findByUserId, create, update, deleteNote };
