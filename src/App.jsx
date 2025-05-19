import { useState } from 'react'
import React from 'react'
// import './App.css'
import { useDispatch, useSelector } from 'react-redux'


function App() {

  const contacts = useSelector(state=>state.cont)
  const filter = useSelector(state=>state.fil)

  const dispatch = useDispatch()

  const add =e=> {
    e.preventDefault()
    dispatch({ type: 'addcontact', payload: {
      name: e.target.elements.inputname.value,
      number: e.target.elements.inputnumber.value
    } })
  }

  const del =e=> {
    e.preventDefault()
    dispatch({ type: 'delcontact', payload: e.target.elements.delID.value })
  }

  const filt =e=> {
    e.preventDefault()
    dispatch({ type: 'setfilter', payload: e.target.value })
  }


  return (<>
    <form onSubmit={add}>
      <input required type="text" name="inputname" id="input-name" placeholder='Name' />
      <input required type="text" name="inputnumber" id="input-number" placeholder='Number (no letters)' pattern='^[^A-Za-z]*$' />
      <button type='submit'>Add Contact</button>
    </form>
    <form onSubmit={del}>
      <input required name="delID" type="number" id="del-id" placeholder='ID' />
      <button type='submit'>Delete Contact</button>
    </form>
    <input type="text" name="filter" id="filter" placeholder='Filter'
      onInput={filt}/>
    <ul>
      {contacts.filter(x=>x.name.includes(filter)).map((x,i)=>(
        <li key={x.id}>
          <p>
            <span style={{fontSize:'0.5em'}}>#{x.id}</span>
            &nbsp;
            {x.name}:
            &nbsp;
            <code style={{fontStyle:'italic',color:'yellow'}}>{x.number}</code>
          </p>
        </li>
        ))}
    </ul>
  </>)
}

export default App