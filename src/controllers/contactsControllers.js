import HttpError from "../helpers/HttpError.js";
import * as services from "../services/contactsServices.js";
import parsePaginationQuery from "../utils/pagination/parsePaginationQuery.js";
import parseSortParams from "../utils/sort/parseSortParams.js";

export const getAllContacts = async (req, res) => {
  const { page, limit } = parsePaginationQuery(req.query);
  const { order } = parseSortParams(req.query);
  const { id: owner } = req.user;
  const result = await services.listContacts({ owner, page, limit, order });
  res.json({
    status: 200,
    message: "Successfully found contacts",
    data: result,
  });
};

export const getOneContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const contact = await services.getContactById({ id, owner });
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Successfully found contact with ID: ${id}`,
    data: contact,
  });
};

export const deleteContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const contact = await services.removeContact({ id, owner });
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Contact with ID: ${id} was deleted successfully`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const updateContact = { ...req.body, owner };

  const contact = await services.addContact(updateContact);
  res.status(201).json({
    status: 201,
    message: "Contact was created successfully",
    data: contact,
  });
};

export const updateContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const contact = await services.updateContact({ id, owner }, req.body);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: `Contact with ${id} was successfully updated`,
    data: contact,
  });
};

export const updateStatusContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const contact = await services.updateContact({ id, owner }, req.body);
  if (!contact) throw HttpError(404, "Not found");
  res.json({
    status: 200,
    message: "Status of contact was updated successfully",
    data: contact,
  });
};
