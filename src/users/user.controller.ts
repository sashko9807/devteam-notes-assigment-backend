import express from "express";
import {
  changePasswordHandler,
  createUserHandler,
  loginHandler,
} from "./handlers";
import { authMiddleware } from "../middleware/jwtVerify";

const router = express.Router();

router.post("/user/register", createUserHandler);
router.post("/user/login", loginHandler);
router.patch("/user/change-password", authMiddleware, changePasswordHandler);

export const userController = router;
