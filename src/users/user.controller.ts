import express from "express";
import { createUserHandler, loginHandler } from "./handlers";

const router = express.Router();
router.post("/user/register", createUserHandler);
router.post("/user/login", loginHandler);

export const userController = router;
