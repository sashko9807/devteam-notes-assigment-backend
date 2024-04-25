import { Request, Response } from "express";
import { userService } from "./user.service";
import {
  CreateUserHandleReq,
  createUserSchema,
  updateUserPasswordSchema,
} from "./schemas";
import bcrypt from "bcrypt";
import { JWTSignToken } from "../utils/JWTSignToken";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserHandleReq>,
  res: Response
) {
  const { value, error } = createUserSchema.validate(req.body);
  if (error) {
    res.sendStatus(400).send(error.details);
    return;
  }

  const { email, password } = value;

  const user = await userService.findUserByEmail(email);
  if (user) {
    res
      .sendStatus(409)
      .send({ message: "User with such email already exists" });
    return;
  }
  const createdUser = await userService.createNewUser(email, password);
  if (!createdUser)
    res.sendStatus(500).send({ message: "User couldn't be created" });

  res.sendStatus(201);
}

export async function loginHandler(req: Request, res: Response) {
  const { value, error } = createUserSchema.validate(req.body);
  const { email, password } = value;
  if (error) {
    res.sendStatus(400).send(error.details);
    return;
  }
  const user = await userService.findUserByEmail(email);
  if (!user) {
    res.sendStatus(404).send({ message: "No user found with such email" });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.sendStatus(401).send({ message: "Passwords don't match" });
  }
  const [accessToken, refreshToken] = JWTSignToken(user.id, user.email);
  return res.json({
    accessToken,
    refreshToken,
  });
}

export async function changePasswordHandler(req: Request, res: Response) {
  const { value, error } = updateUserPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  const { email, password, currentPassword } = value;
  const user = await userService.findUserByEmail(email);
  if (!user)
    return res.status(404).send({ message: "No user found with such email" });

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    return res.status(401).json({
      message: "Passwords don't match",
    });
  }
  await userService.updateUserPassword(email, password);
  return res.status(200).send({ message: "Password updated successfully" });
}
