import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import ctrlWrap from "../utils/ctrlWrap.js";
import validateBody from "../middlewares/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import isValidID from "../middlewares/isValidID.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.use("/:id", isValidID("id"));

contactsRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  validateBody(updateStatusSchema),
  ctrlWrap(updateStatusContact)
);

contactsRouter.get("/", ctrlWrap(getAllContacts));

contactsRouter.get("/:id", ctrlWrap(getOneContact));

contactsRouter.delete("/:id", ctrlWrap(deleteContact));

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  ctrlWrap(createContact)
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(updateContactSchema),
  ctrlWrap(updateContact)
);

export default contactsRouter;
