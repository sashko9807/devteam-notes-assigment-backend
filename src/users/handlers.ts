import { Request, Response } from "express";
import { findUserByEmail, createNewUser } from "./user.service";
import { CreateUserHandleReq, createUserSchema } from "./schemas";
export async function createUserHandler(
  req: Request<{}, {}, CreateUserHandleReq>,
  res: Response
) {
  const { value, error } = createUserSchema.validate(req.body);

  if (error) {
    res.status(400).send(error.details);
    return;
  }
  const { email, password } = value;
  const user = await findUserByEmail(email);
  if (user) {
    res.status(409).send({ message: "User with such email already exists" });
    return;
  }
  const createdUser = await createNewUser(email, password);
  if (!createdUser)
    res.status(500).send({ message: "User couldn't be created" });
  res.send(201);
}
