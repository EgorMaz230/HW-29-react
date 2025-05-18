import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => (
  <div>
    <h1>Книга контактів</h1>
    <ContactForm />
    <Filter />
    <ContactList />
  </div>
);

export default App;
