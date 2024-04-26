import express, { Router } from "express";
import { authMiddleware } from "../middleware/jwtVerify";
import {
  createNoteHandler,
  getUserNotesHandler,
  updateNoteHandler,
} from "./handlers";

const router: Router = express.Router();
router.get("/", authMiddleware, getUserNotesHandler);
router.post("/", authMiddleware, createNoteHandler);
router.put("/:id", authMiddleware, updateNoteHandler);

export const noteController = router;
