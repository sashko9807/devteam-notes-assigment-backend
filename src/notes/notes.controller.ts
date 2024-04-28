import express, { Router } from "express";
import { authMiddleware } from "../middleware/jwtVerify";
import {
  createNoteHandler,
  deleteNoteHandler,
  getUserNotesHandler,
  updateNoteHandler,
} from "./handlers";

const router: Router = express.Router();
router.get("/", authMiddleware, getUserNotesHandler);
router.post("/", authMiddleware, createNoteHandler);
router.put("/:id", authMiddleware, updateNoteHandler);
router.delete("/:id", authMiddleware, deleteNoteHandler);

export const noteController = router;
