import { Request, Response, NextFunction } from "express";

import * as jwt from "jsonwebtoken";
import { env } from "../config/config";

export type DecodedPayload = {
  userId: string;
  email: string;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const accessToken = authHeader.substring(7);

  jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET as string, (err, payload) => {
    const { userId, email } = payload as DecodedPayload;
    if (err) return res.sendStatus(403).send({ message: err.message });
    req.body.userId = userId;
    req.body.email = email;
    next();
  });
};
