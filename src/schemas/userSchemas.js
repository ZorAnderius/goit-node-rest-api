import Joi from "joi";
import { emailRegexp, subscribeList } from "../constants/authVar.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string()
    .trim()
    .pattern(emailRegexp, "example@example.com")
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscribeList),
});

export const authSignInSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
