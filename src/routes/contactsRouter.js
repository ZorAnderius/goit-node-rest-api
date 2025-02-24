import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import ctrlWrap from "../utils/ctrlWrap.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrap(getAllContacts));

contactsRouter.get("/:id", ctrlWrap(getOneContact));

contactsRouter.delete("/:id", ctrlWrap(deleteContact));

contactsRouter.post("/", ctrlWrap(createContact));

contactsRouter.put("/:id", ctrlWrap(updateContact));

export default contactsRouter;
