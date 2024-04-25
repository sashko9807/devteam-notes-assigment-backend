import express, { Express, Request, Response } from "express";
import { userController } from "./users/user.controller";

import { env } from "../config";

const app: Express = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/user", userController);

app.listen(port, () => {
  console.log(`[server]: Server environment is ${env.NODE_ENV}`);
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
