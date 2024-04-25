import express from "express";
import { createUserHandler } from "./handlers";

const router = express.Router();
router.post("/register", createUserHandler);

export const userController = router;
