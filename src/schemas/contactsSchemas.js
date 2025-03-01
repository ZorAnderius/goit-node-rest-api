import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.boolean().default(false),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } }),
  phone: Joi.string().trim(),
  favorite: Joi.boolean(),
});

export const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
