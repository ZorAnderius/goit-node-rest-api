import HttpError from "../helpers/HttpError.js";
import * as services from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await services.listContacts();
  res.json({
    status: 200,
    message: "Successfully found contacts",
    data: result,
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await services.getContactById(id);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Successfully found contact with ID: ${id}`,
    data: contact,
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await services.removeContact(id);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Contact with ID: ${id} was deleted successfully`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const contact = await services.addContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Contact was created successfully",
    data: contact,
  });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await services.updateContact(id, req.body);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Contact with ${id} was successfully updated`,
    data: contact,
  });
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const contact = await services.updateContact(id, req.body);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: "Status of contact was updated successfully",
    data: contact,
  });
};
