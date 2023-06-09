// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  useEffect(() => {
    setIsLoggedIn(user !== null);
  }, [user]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {isLoggedIn && (
      <NavLink to={`/spots/`}>
        Create a New Spot
      </NavLink>
    )}
      <button id='header-links' onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div id="drop-down-info">
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            <div id="manage-spots-link">
              <NavLink to="/spots/current">Manage Spots</NavLink>
            </div>
            <div id="profile-button-logout">
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />

            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
