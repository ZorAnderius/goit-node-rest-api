import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().required(),
});

export const updateContactSchema = Joi.object({});
