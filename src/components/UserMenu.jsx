import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice'; 
import { selectUserEmail } from '../redux/selectors'; 


const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail); 

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="user-menu"> 
      <p>{userEmail}</p>
      <button type="button" onClick={handleLogout}>Вийти</button>
    </div>
  );
};

export default UserMenu;