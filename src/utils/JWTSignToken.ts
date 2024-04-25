import * as jwt from "jsonwebtoken";
import { env } from "../../config";

export function JWTSignToken(userID: string, email: string) {
  const accessToken = jwt.sign(
    { userId: userID, email: email },
    env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: env.ACCESS_TOKEN_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { userId: userID, email: email },
    env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: env.REFRESH_TOKEN_EXPIRATION }
  );

  return [accessToken, refreshToken];
}
