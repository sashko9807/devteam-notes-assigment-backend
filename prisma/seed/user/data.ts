import { User } from "@prisma/client";
import { userFactory } from "./factory";

export const initialUser: User = userFactory.build(
  {},
  {
    associations: {
      id: "a1917887-66e4-4177-82c4-f7a7e4296b2b",
      email: "admin@notes-app.com",
      password: "NoteApp",
    },
  }
);
