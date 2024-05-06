import { Request, Response } from "express";
import { userService } from "./user.service";
import {
  CreateUserHandleReq,
  UpdateUserPasswordReq,
  createUserSchema,
  updateUserPasswordSchema,
} from "./schemas";
import bcrypt from "bcrypt";
import { JWTSignToken } from "../utils/JWTSignToken";
import * as jwt from "jsonwebtoken";
import { env } from "../config/config";
import { DecodedPayload } from "../middleware/jwtVerify";

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
  if (!createdUser) {
    res.sendStatus(500).send({ message: "User couldn't be created" });
    return;
  }

  res.sendStatus(201);
}

export async function loginHandler(
  req: Request<{}, {}, CreateUserHandleReq>,
  res: Response
) {
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
    res.sendStatus(401).send({ message: "Passwords don't match" });
    return;
  }

  const [accessToken, refreshToken] = JWTSignToken(user.id, user.email);
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.json({
    accessToken,
  });
}

export async function changePasswordHandler(
  req: Request<{}, {}, UpdateUserPasswordReq>,
  res: Response
) {
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

export function refreshTokenHandler(req: Request, res: Response) {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    console.log(`not a cookie`);
    res.status(401).send("Invald cookie");
    return;
  }
  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, {}, (err, payload) => {
    if (err) {
      console.log(`refreshToken ${err.message}`);
      res.status(403).send({ message: err.message });
      return;
    }
    const { userId, email } = payload as DecodedPayload;
    const accessToken = jwt.sign({ userId, email }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRATION,
    });
    res.json({ accessToken });
  });
}
