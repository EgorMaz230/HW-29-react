import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilter,
  selectFilteredContacts,
} from '../redux/selectors';
import PropTypes from 'prop-types';


const ContactForm = ({ onAddContact, isLoading }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}> 
      <label>
        Ім'я:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Ім'я може містити лише літери, апостроф, тире та пробіли."
          required
        />
      </label>
      <label>
        Номер:
        <input
          type="number" 
          value={number}
          onChange={e => setNumber(e.target.value)}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефону має складатися з цифр, може містити пробіли, дефіси, дужки та починатися з +"
          required
        />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Додавання контакту...' : 'Додати контакт'}
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


const Filter = ({ filter, onSetFilter }) => {
  return (
    <div className="filter-container">
      <label>
        Пошук контактів за іменем:
        <input
          type="text"
          value={filter}
          onChange={e => onSetFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
};

const ContactListItem = ({ contact, onDeleteContact }) => {
  return (
    <li className="contact-list-item"> 
      <span>
        {contact.name}: {contact.number}
      </span>
      <button type="button" onClick={() => onDeleteContact(contact.id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};


const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className="contact-list"> 
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};


const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts); 
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const filteredContacts = useSelector(selectFilteredContacts); 

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = contact => {
    const isDuplicate = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${contact.name} вже є в контактах.`);
      return;
    }
    dispatch(addContact(contact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleSetFilter = value => {
    dispatch(setFilter(value));
  };

  return (
    <div> 
      <h1>Телефонна книга</h1>
      <ContactForm onAddContact={handleAddContact} isLoading={isLoading} />

      <h2>Контакти</h2>
      <Filter filter={filter} onSetFilter={handleSetFilter} />

      {isLoading && !error && <p className="loading-message">Завантаження контактів...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!isLoading && !error && contacts.length === 0 && <p>Контактів не знайдено.</p>}
      
      {/* Отображаем список только если есть отфильтрованные контакты */}
      {!isLoading && !error && filteredContacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      )}
      {!isLoading && !error && contacts.length > 0 && filteredContacts.length === 0 && filter && (
        <p>Немає контактів, що відповідають вашому фільтру.</p>
      )}
    </div>
  );
};

export default ContactsPage;