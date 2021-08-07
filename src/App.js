import React, { Component } from "react";
import "./App.css";

import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import Filter from "./Components/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  handleAddContact = (newContact) => {
    // console.log(newContact);
    const uniqueContact = this.handleUniqueContact(newContact);
    if (!uniqueContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState((prevState) => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  handleUniqueContact = (newContact) => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(
      (contact) => contact.name === newContact.name
    );
    return !isExistContact;
    // console.log(isExistContact);
  };

  handleChangeFilter = (e) => {
    this.setState({ filter: e.target.value });
    // console.log(e);
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) => {
      // console.log(contact.name);
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  handleRemoveContact = (id) =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));

  componentDidMount() {
    // console.log("componentDidMount");
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    // console.log(contacts);
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate");
    // console.log(prevProps);
    if (this.state.contacts !== prevState.contacts) {
      // console.log("Изменился стейт");
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
    // console.log(prevState);
    // console.log(this.state);
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="contaiter">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}

export default App;
