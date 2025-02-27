import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import ctrlWrap from "../utils/ctrlWrap.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import isValidID from "../helpers/isValidID.js";

const contactsRouter = express.Router();

contactsRouter.use("/:id", isValidID("id"));

contactsRouter.get("/", ctrlWrap(getAllContacts));

contactsRouter.get("/:id", ctrlWrap(getOneContact));

contactsRouter.delete("/:id", ctrlWrap(deleteContact));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlWrap(createContact)
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  ctrlWrap(updateContact)
);

export default contactsRouter;
