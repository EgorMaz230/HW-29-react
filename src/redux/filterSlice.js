

const initialState = '';

export const setFilter = (payload) => ({
  type: 'filter/setFilter',
  payload,
});

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filter/setFilter':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
