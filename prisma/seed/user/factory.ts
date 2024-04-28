import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { Factory } from "fishery";

export const userFactory = Factory.define<User>(({ associations }) => ({
  id: associations.id || faker.string.uuid(),
  email: associations.email || faker.internet.email(),
  password: associations.password || faker.string.alphanumeric(5),
  createdAt: faker.date.soon(),
  updatedAt: faker.date.soon(),
}));
