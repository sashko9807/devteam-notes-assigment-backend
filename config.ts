import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

const envFilePath = path.resolve(
  process.cwd(),
  `./.env.${process.env.NODE_ENV}`
);

dotenv.config({
  path: envFilePath,
  override: true,
});

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "staging")
      .required(),
    PORT: Joi.number().positive().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().positive().required(),
    DB_NAME: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config error: ${error.message}`);
}
export const env = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  ACCESS_TOKEN_SECRET: envVars.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: envVars.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: envVars.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: envVars.REFRESH_TOKEN_EXPIRATION,
};
