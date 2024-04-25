import dotenv from "dotenv";
import path from "path";

const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: envFilePath,
});
export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
