import Joi from "joi";

export type CreateUserHandleReq = {
  email: string;
  password: string;
};

export type UpdateUserPasswordReq = {
  email: string;
  currentPassword: string;
  password: string;
};

export const createUserSchema = Joi.object<CreateUserHandleReq>()
  .options({ abortEarly: false, allowUnknown: true })
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

export const updateUserPasswordSchema = Joi.object<UpdateUserPasswordReq>()
  .options({ abortEarly: false, allowUnknown: true })
  .keys({
    email: Joi.string().email().required().messages({
      "string.email": "Must be valid email",
      "any.required": "Email field is required",
    }),
    currentPassword: Joi.string().min(6).required().messages({
      "string.min": "Password must be atleast 6 characters long",
      "any.required": "Password field is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be atleast 6 characters long",
      "any.required": "Password field is required",
    }),
  });
