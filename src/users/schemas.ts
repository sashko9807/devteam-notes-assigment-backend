import Joi from "joi";

export type CreateUserHandleReq = {
  email: string;
  password: string;
};

export const createUserSchema = Joi.object<CreateUserHandleReq>()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string().email().required().messages({
      "string.email": "Must be valid email",
      "any.required": "Email field is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be atleast 6 characters long",
      "any.required": "Password field is required",
    }),
  });
