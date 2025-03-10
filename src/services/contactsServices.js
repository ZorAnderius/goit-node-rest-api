import defaultPagination from "../constants/defaultPagination.js";
import Contact from "../db/models/Contact.js";
import HttpError from "../helpers/HttpError.js";
import buildFilterQuery from "../utils/filter/buildFilterQuery.js";
import calculatePaginationValues from "../utils/pagination/calculatePaginationValues.js";

export const listContacts = async ({
  page = defaultPagination.page,
  limit = defaultPagination.limit,
  order,
  filter,
  ...restQuery
}) => {
  const offset = (page - 1) * limit;
  const query = { ...restQuery, ...buildFilterQuery(filter) };

  const { count, rows: contacts } = await Contact.findAndCountAll({
    where: query,
    offset,
    limit,
    order,
  });

  const paginationValue = calculatePaginationValues(count, page, limit);
  if (page > paginationValue.totalPage || page < 1)
    throw HttpError(400, "Page is out of range");

  return contacts?.length > 0
    ? {
        contacts,
        ...paginationValue,
      }
    : contacts
};

export const getContactById = (query) => Contact.findOne({ where: query });

export const addContact = (newContact) => Contact.create(newContact);

export const removeContact = async (query) => {
  const contact = await getContactById(query);
  if (!contact) return null;
  contact.destroy();
  return contact;
};

export const updateContact = async (query, updatesData) => {
  const contact = await getContactById(query);
  if (!contact) return null;

  return contact.update(updatesData, {
    returning: true,
  });
};
