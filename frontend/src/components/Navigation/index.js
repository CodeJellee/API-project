// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='home-drop-down-container'>
      <li id='header-links'>
        <NavLink exact to="/"><i className="fa fa-paper-plane"></i> AirBnBeyond </NavLink>
      </li>

      {isLoaded && (
        <li id='header-links'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
