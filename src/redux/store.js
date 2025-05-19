import { combineReducers, createStore } from "redux";
import { contactReducer, filterReducer } from './reducers'



const rootReducer = combineReducers({
  cont: contactReducer,
  fil: filterReducer
})

export const store = createStore(rootReducer);