import { noteService } from "./notes.service";
import { CreateNoteSchema, createNoteSchema, findNoteSchema } from "./schemas";
import { Request, Response } from "express";

export async function getUserNotesHandler(
  req: Request<{}, {}, { userId: string }>,
  res: Response
) {
  const { value, error } = findNoteSchema.validate(req.body);

  if (error) {
    console.log(error);
    res.sendStatus(400).send(error.details);
    return;
  }
  const notes = await noteService.findByUserId(value.userId);
  res.status(200).json(notes);
}

export async function createNoteHandler(
  req: Request<{}, {}, CreateNoteSchema>,
  res: Response
) {
  const { value: data, error } = createNoteSchema.validate(req.body);
  console.log(`called`);
  if (error) {
    res.sendStatus(400).send(error.details);
    return;
  }
  const note = await noteService.create(data);
  res.status(201).json(note);
}

export async function updateNoteHandler(
  req: Request<{ id: string }, {}, CreateNoteSchema>,
  res: Response
) {
  const noteId = req.params.id;
  const { value: data, error } = createNoteSchema.validate(req.body);
  if (error) {
    res.sendStatus(400).send(error.details);
    return;
  }
  const note = await noteService.update(noteId, data);
  res.status(200).json(note);
}

export async function deleteNoteHandler(
  req: Request<{ id: string }, {}, { userId: string; email: string }>,
  res: Response
) {
  const noteId = req.params.id;
  const userId = req.body.userId;

  const note = await noteService.deleteNote(noteId, userId);
  return res
    .status(200)
    .json({ message: `Note with ${note.id} deleted successfully` });
}
