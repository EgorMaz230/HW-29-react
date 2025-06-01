import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: (state, action) => {
      const takenIds = state.map(x => x.id);
      let newId = 1;
      while (takenIds.includes(newId)) newId++;
      state.push({ ...action.payload, id: newId });
    },
    delContact: (state, action) => {
      return state.filter(x => x.id !== Number(action.payload));
    }
  }
});

export const { addContact, delContact } = contactsSlice.actions;
export default contactsSlice.reducer;
