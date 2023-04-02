import { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(name + ' is already in contacts')
      : this.setState(prevState => {
          return {
            contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
          };
        });
  };

  removeContact = id => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    let { filter, contacts } = this.state;
    const normalizedFilterValue = filter.toLowerCase();
    const filterdContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );
    return filterdContacts;
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <div className={css.section}>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </div>
        <div className={css.section}>
          <h2 className={css.subtitle}>Contacts</h2>
          <Filter onChange={this.handleFilter} value={filter} />
          <ContactList
            contacts={this.getFilteredContacts()}
            onRemove={this.removeContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
