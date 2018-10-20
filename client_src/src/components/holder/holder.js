import React from "react";
import { view } from "react-easy-state";
import { Container, Visibility } from "semantic-ui-react";

const holder = props => {
  return <Container fluid textAlign='center'>{ props.page }</Container>;
};

export default view(holder);
