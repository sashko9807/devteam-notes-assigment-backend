import Joi from "joi";

export type CreateNoteSchema = {
  title: string;
  content: string;
  userId: string;
};

export type UpdateNoteSchema = CreateNoteSchema;

export const findNoteSchema = Joi.object().keys({
  userId: Joi.string().required().messages({
    "any.required": "UserId is required",
  }),
});

export const createNoteSchema = Joi.object<CreateNoteSchema>()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    title: Joi.string().required().messages({
      "any.required": "Note title is required",
    }),
    content: Joi.string().required().messages({
      "any.required": "Note content is required",
    }),
    userId: Joi.string().required().messages({
      "any.required": "UserId is required",
    }),
  });
