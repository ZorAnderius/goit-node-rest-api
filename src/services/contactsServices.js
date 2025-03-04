import Contact from "../db/models/Contact.js";

export const listContacts = (query) =>
  Contact.findAll({
    where: query,
  });

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
  console.log(contact);
  if (!contact) return null;

  return contact.update(updatesData, {
    returning: true,
  });
};
