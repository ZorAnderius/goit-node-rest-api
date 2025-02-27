import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .trim()
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } }),
  phone: Joi.string()
    .trim(),
});
