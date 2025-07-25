import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store, persistor } from './redux/store'; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import axios from 'axios'; 

axios.defaults.baseURL = 'https://connections-api.goit.global/'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
  </StrictMode>
)