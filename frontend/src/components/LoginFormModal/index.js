// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isUsernameValid = credential.length >= 4;
  const isPasswordValid = password.length >= 6;


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoUserSubmit = () => {
    const demoUser = {
      credential: "demo@user.io",
      password: "password", // Replace with the demo user password
    };

    dispatch(sessionActions.login(demoUser))
      .then(closeModal)
      .catch((err) => {
        //prob dont need a catch error here?
      });
  };

  return (
    <>
      <div id="error-message-log-in">
        <div id="log-in">Log In</div>
        {errors.credential && <p>{errors.credential}</p>}
      </div>
      <form id="login-form" onSubmit={handleSubmit}>
      <div id="username-or-email">
        <label>
          Username or Email
          <br></br>
          <input
            type="text"
            id="full-width-this"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
      </div>

       <label>
          Password
          <br></br>
          <input
            type="password"
            id="full-width-this"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
        type="submit"
        id="log-in-button-home"
        disabled={!isUsernameValid || !isPasswordValid}>
          Log In
        </button>
      </form>
      <NavLink id="demo-user-link" to="/" className="demo-user-button" onClick={handleDemoUserSubmit}>
        Log in as Demo User
      </NavLink>
    </>
  );
}

export default LoginFormModal;
