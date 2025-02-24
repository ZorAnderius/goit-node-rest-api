import { v4 as uuid4 } from "uuid";
import * as path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const contactsPath = process.cwd().includes("src")
  ? path.resolve("db", "contacts.json")
  : path.resolve("src", "db", "contacts.json");

const updateContacts = async (contact) => {
  await writeFile(contactsPath, JSON.stringify(contact, null, 2), "utf-8");
};

export const getAllContacts = async () => {
  const contacts = await readFile(contactsPath);
  return contacts ? JSON.parse(contacts) : [];
};

export const getOneContact = async (contactId) => {
  const contacts = await getAllContacts();
  if (!contacts.length) return null;
  const contact = contacts?.find(({ id }) => id === contactId);
  return contact || null;
};

export const deleteContact = async (removeId) => {
  const contacts = await getAllContacts();
  if (!contacts.length) return null;
  const index = contacts?.findIndex(({ id }) => id === removeId);
  if (index === -1) return null;
  const [contact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return contact;
};

export const createContact = async (newContact) => {
  const contacts = await getAllContacts();
  const addContact = { id: uuid4(), ...newContact };
  contacts.push(addContact);
  await updateContacts(contacts);
  return addContact;
};

export const updateContact = async (updateId, updatesData) => {
  const contacts = await getAllContacts();
  if (!contacts.length) return null;
  const index = contacts?.find(({ id }) => id === updateId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...updatesData };
  await updateContacts(contacts);
  return contacts[index];
};
