// frontend/src/components/SignupFormPage/index.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";




function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { closeModal } = useModal();
  const isFormValid = email && username && firstName && lastName && password && confirmPassword;
  const isUsernameValid = username.length >= 4;
  const isPasswordValid = password.length >= 6;

  useEffect(() => {
    setErrors({});
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id="sign-up-lieu-modal">
      <div id="sign-up">Sign Up</div>

    <div id="sign-up-form">
      <form onSubmit={handleSubmit}>
        <div id="errors">
          {errors.email && <p>{errors.email}</p>}
          {errors.username && <p>{errors.username}</p>}
          {errors.firstName && <p>{errors.firstName}</p>}
          {errors.lastName && <p>{errors.lastName}</p>}
          {errors.password && <p>{errors.password}</p>}
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

        <button id="sign-up-button" type="submit" disabled={!isFormValid || !isUsernameValid || !isPasswordValid}>
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
}

export default SignupFormModal;
