//clean almost
/* eslint-disable */
import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import { appstore, loadData, loadSchema } from "./stores/store";
import { view } from "react-easy-state";

import LoginPage from "./pages/login/login";
import MainPage from "./pages/main";
import NoMatch from "./pages/NoMatch";

class App extends Component {
  render() {
    const loggedIn = appstore.common.do.getCurrentToken();
    return (
      <BrowserRouter>
        <Switch>

          <Route path="/login"
          render={() => (loggedIn ? <Redirect to="/" /> : <LoginPage />)}
          />
          <Route
            exact
            path="/"
            render={() => (loggedIn ? <MainPage /> : <Redirect to="/login" />)}
          />
          <Route render={() => (loggedIn ? <MainPage /> : <Redirect to="/login" />)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default view(App);
