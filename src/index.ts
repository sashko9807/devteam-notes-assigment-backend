import express, { Express, Request, Response } from "express";
import { userController } from "./users/user.controller";

import { env } from "./config/config";
import { noteController } from "./notes/notes.controller";

const app: Express = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/user", userController);
app.use("/api/v1/notes", noteController);

app.listen(port, () => {
  console.log(`[server]: Server environment is ${env.NODE_ENV}`);
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
