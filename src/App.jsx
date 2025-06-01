import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, delContact } from './redux/contactsSlice';
import { setFilter } from './redux/filterSlice';

function App() {
  const contacts = useSelector(state => state.cont);
  const filter = useSelector(state => state.fil);
  const dispatch = useDispatch();

  const add = e => {
    e.preventDefault();
    dispatch(addContact({
      name: e.target.elements.inputname.value,
      number: e.target.elements.inputnumber.value
    }));
  };

  const del = e => {
    e.preventDefault();
    dispatch(delContact(e.target.elements.delID.value));
  };

  const filt = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
  <div className="container">
    <h1>Contacts</h1>

    <form onSubmit={add}>
      <input
        required
        type="text"
        name="inputname"
        id="input-name"
        placeholder="Name"
      />
      <input
        required
        type="text"
        name="inputnumber"
        id="input-number"
        placeholder="Number (no letters)"
        pattern="^[^A-Za-z]*$"
      />
      <button type="submit">Add Contact</button>
    </form>

    <form onSubmit={del}>
      <input required name="delID" type="number" id="del-id" placeholder="ID" />
      <button type="submit">Delete Contact</button>
    </form>

    <input
      type="text"
      id="filter"
      name="filter"
      placeholder="Filter"
      onInput={filt}
    />

    <ul>
      {contacts
        .filter((x) => x.name.includes(filter))
        .map((x) => (
          <li key={x.id}>
            <span className="id">#{x.id}</span>
            {x.name}
            <code>{x.number}</code>
          </li>
        ))}
    </ul>
  </div>
);

}

export default App;
