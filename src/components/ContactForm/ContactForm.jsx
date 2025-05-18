import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import PropTypes from 'prop-types';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const handleSubmit = e => {
    e.preventDefault();

    if (contacts.find(c => c.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} вже є у контактах`);
      return;
    }

    dispatch(addContact({ id: Date.now().toString(), name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ім'я"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <button type="submit">Додати контакт</button>
    </form>
  );
};

ContactForm.propTypes = {
  
};

export default ContactForm;
