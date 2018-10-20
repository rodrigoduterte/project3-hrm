import React from "react";
import ReactDOM from "react-dom";

import auth from "../../utils/api/data/auth";

import ReactSignupLoginComponent from 'react-signup-login-component'; //needs import library

const LoginPage = (props) => {
  const signupWasClickedCallback = (data) => {
    auth.signup(data.username, data.password)
  };
  const loginWasClickedCallback = (data) => {
    auth.login(data.username, data.password);
  };
  return (
    <div>
      <ReactSignupLoginComponent
        title="ERP ERP"
        usernameCustomLabel="Email"
        handleSignup={signupWasClickedCallback}
        submitLoginCustomLabel="Login"
        handleLogin={loginWasClickedCallback}
      />
    </div>
  );
};

export default LoginPage;
