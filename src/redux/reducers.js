const initstate = { contacts:[], filter:'' }

export const contactReducer = (state = [], action) => {

  
  if (action.type === "addcontact") {
    const takenids = state.map(x=>x.id);
    let newid = 1;
    while(true) {
      if(!takenids.includes(newid)) break;
      newid++;
    }
    const newcontact = { ...action.payload, id: newid };
    return [...state, newcontact];
  }
  if (action.type === "delcontact") {
    return [...state].filter(x=>x.id!=action.payload)
  }
  return state;
};


export const filterReducer = (state = '', action) => {
  if (action.type === "setfilter") {
    return action.payload;
  }
  return state
};