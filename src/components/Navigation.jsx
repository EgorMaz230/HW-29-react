import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu'; 
import { selectIsLoggedIn } from '../redux/selectors'; 


const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); 

  return (
    <nav className="main-nav"> 
      <NavLink to="/">Home</NavLink>
      {!isLoggedIn && <NavLink to="/register">Зареєструватися</NavLink>}
      {!isLoggedIn && <NavLink to="/login">Вхід</NavLink>}
      {isLoggedIn && <NavLink to="/contacts">Контакти</NavLink>}
      {isLoggedIn && <UserMenu />}
    </nav>
  );
};

export default Navigation;