import { v4 as uuid4 } from "uuid";
import * as path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import Contact from "../db/models/Contact.js";

const contactsPath = path.resolve("src", "db", "contacts.json");

const updateContacts = async (contact) => {
  await writeFile(contactsPath, JSON.stringify(contact, null, 2), "utf-8");
};

export const listContacts = async () => {
  const contacts = await readFile(contactsPath);
  return contacts ? JSON.parse(contacts) : [];
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  if (!contacts.length) return null;
  const contact = contacts?.find(({ id }) => id === contactId);
  return contact || null;
};

export const removeContact = async (removeId) => {
  const contacts = await listContacts();
  if (!contacts.length) return null;
  const index = contacts?.findIndex(({ id }) => id === removeId);
  if (index === -1) return null;
  const [contact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return contact;
};

export const addContact = async (newContact) => {
  const contacts = await listContacts();
  const addContact = { id: uuid4(), ...newContact };
  contacts.push(addContact);
  await updateContacts(contacts);
  return addContact;
};

export const updateContact = async (updateId, updatesData) => {
  const contacts = await listContacts();
  if (!contacts.length) return null;
  const index = contacts?.findIndex(({ id }) => id === updateId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...updatesData };
  await updateContacts(contacts);
  return contacts[index];
};
