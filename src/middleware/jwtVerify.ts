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
  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);
  const accessToken = authHeader?.substring(7);
  if (!authHeader || !accessToken) {
    res.status(401).send({ code: "Invalid authorization header" });
    return;
  }

  jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET as string, (err, payload) => {
    if (err) {
      console.log(`verify-token ${err.message}`);
      res.status(403).send({ message: err.message });
      return;
    }
    const { userId, email } = payload as DecodedPayload;
    req.body.userId = userId;
    req.body.email = email;
    next();
  });
};
