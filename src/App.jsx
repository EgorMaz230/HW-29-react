import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, delContact } from './redux/contactsSlice';
import { setFilter } from './redux/filterSlice';

function App() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const add = e => {
    e.preventDefault();
    dispatch(addContact({
      name: e.target.elements.inputname.value,
      number: e.target.elements.inputnumber.value
    }));
    e.target.reset();
  };

  const del = e => {
    e.preventDefault();
    dispatch(delContact(e.target.elements.delID.value));
    e.target.reset();
  };

  const filt = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="container">
      <h1>Contacts</h1>

      <form onSubmit={add}>
        <input required name="inputname" placeholder="Name" />
        <input required name="inputnumber" placeholder="Number" pattern="^[^A-Za-z]*$" />
        <button type="submit">Add Contact</button>
      </form>

      <form onSubmit={del}>
        <input required name="delID" type="number" placeholder="ID" />
        <button type="submit">Delete Contact</button>
      </form>

      <input
        type="text"
        placeholder="Filter"
        onInput={filt}
        value={filter}
      />

      <ul>
        {contacts
          .filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
          .map(x => (
            <li key={x.id}>
              <span className="id">#{x.id}</span> {x.name} <code>{x.number}</code>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
