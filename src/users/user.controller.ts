import express from "express";
import {
  changePasswordHandler,
  createUserHandler,
  loginHandler,
} from "./handlers";
import { authMiddleware } from "../middleware/jwtVerify";

const router = express.Router();

router.post("/register", createUserHandler);
router.post("/login", loginHandler);
router.patch("/change-password", authMiddleware, changePasswordHandler);

export const userController = router;
