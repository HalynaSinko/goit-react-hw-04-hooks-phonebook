import React, { useState, useEffect } from "react";
import "./App.css";

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const INITIAL_CONTACTS = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("contacts")) ?? INITIAL_CONTACTS
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  function handleAddContact(newContact) {
    // console.log(newContact);
    const uniqueContact = handleUniqueContact(newContact);
    if (!uniqueContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts((prev) => [newContact, ...prev]);
  }

  const handleChangeFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  function handleUniqueContact(newContact) {
    const isExistContact = !!contacts.find(
      (contact) => contact.name === newContact.name
    );
    return !isExistContact;
    // console.log(isExistContact);
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  function handleRemoveContact(id) {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
  }

  return (
    <div className="contaiter">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onRemove={handleRemoveContact}
      />
    </div>
  );
}
