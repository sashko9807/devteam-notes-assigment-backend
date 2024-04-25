import express, { Express, Request, Response } from "express";
import { userController } from "./users/user.controller";

import { env } from "../config";

const app: Express = express();
const port = env.PORT || 3000;

console.log(env.NODE_ENV, env.PORT);
app.use(express.json());
app.use("/api/v1", userController);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
