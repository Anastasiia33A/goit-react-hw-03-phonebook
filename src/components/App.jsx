import { nanoid } from "nanoid";
import React from "react";
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import css from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

// Add Contact and check if such a contact
  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;
    
    if (contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    )) {
      alert(`${name} is already in contacts.`)
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`)
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

// Delete contact
  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };
// Filter
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
   
  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

// componentDidMount
  componentDidMount() {
    console.log('componentDidMount')
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }
// componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    console.log('component DidUpdate')
    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;
    if (nextContact !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContact));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const visibleFilter = this.filterContacts();
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={visibleFilter} onDeleteContact={this.deleteContact} />
        <p className={css.all}>All contacts : {contacts.length}</p>
</div>
  );
  }
}



export default App;
