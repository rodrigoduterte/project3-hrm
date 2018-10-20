import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";

class LogoutPage extends Component {
  render() {
    return (
      <>
        <PageHeader>Signed Out</PageHeader>
        <Jumbotron>
          <h1>You are now signed out</h1>
          <p>
            You can <a href="/login">log in again</a> to return to the homepage
          </p>
        </Jumbotron>
      </>
    );
  }
}

export default LogoutPage;
