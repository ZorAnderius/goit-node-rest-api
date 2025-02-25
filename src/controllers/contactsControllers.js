import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json({
    status: 200,
    message: "Successfully found contacts",
    data: result,
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Successfully found contact with ${id}`,
    data: contact,
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Contact with ${id} delete successfully`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  res.json({
    status: 201,
    message: "Contact was created successfully",
    data: contact,
  });
};

export const updateContact = (req, res) => {};
