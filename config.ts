import dotenv from "dotenv";
import path from "path";

const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
console.log(envFilePath);
dotenv.config({
  path: envFilePath,
});

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HASH_SECRET: process.env.HASH_SECRET,
};
