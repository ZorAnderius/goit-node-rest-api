import Contact from "../db/models/Contact.js";

export const listContacts = () => Contact.findAll();

export const getContactById = (contactId) => Contact.findByPk(contactId);

export const addContact = (newContact) => Contact.create(newContact);

export const removeContact = async (removeId) => {
  const contact = await getContactById(removeId);
  if (!contact) return null;
  contact.destroy();
  return contact;
}

export const updateContact = async (updateId, updatesData) => {
  const contact = await getContactById(updateId);
  if (!contact) return null;

  return contact.update(updatesData, {
    returning: true,
  });
};