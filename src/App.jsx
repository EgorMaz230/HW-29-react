import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './App.css';
import RegisterPage from './components/RegisterPage'; 
import LoginPage from './components/LoginPage';
import ContactsPage from './components/ContactsPage';
import Navigation from './components/Navigation'; 
import PrivateRoute from './components/PrivateRoute'; 
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './redux/authSlice';
import { selectIsLoggedIn, selectAuthLoading } from './redux/selectors';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <p className="loading-message">Оновлення користувача...</p>;
  }

  return (
    <Router>
      <Navigation />
      
      <div className="container">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          } />
          <Route path="/" element={
            isLoggedIn ? (
              <p>Ласкаво просимо! Перейти до <Link to="/contacts">контактів</Link></p> 
            ) : (
              <p>Ласкаво просимо! Перейдіть до <Link to="/register">реєстрації</Link> або <Link to="/login">увійдіть</Link>.</p> 
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;