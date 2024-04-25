import dotenv from "dotenv";
import path from "path";

const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
console.log(envFilePath);
dotenv.config({
  path: envFilePath,
});

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
};
