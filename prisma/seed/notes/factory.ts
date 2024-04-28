import { Note } from "@prisma/client";
import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { initialUser } from "../user/data";
export const noteFactory = Factory.define<Note>(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(1),
  content: faker.lorem.paragraph(3),
  createdAt: faker.date.soon(),
  updatedAt: faker.date.soon(),
  userId: initialUser.id,
}));
