//clean
import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { view } from "react-easy-state";
import { appstore } from "../../stores/store";
import EditProperty from "../../utils/ops/obj/toSingleValue";

class card extends Component {
  constructor(props) {
    super(props);
  }

  cardclick = (e) => {
    /// set properties that will trigger to open a modal containing a form

    const memberID = e.currentTarget.getAttribute('data-id');
    appstore.common.do.setCurrentMemberID(parseInt(memberID));

    appstore.common.do.enableRun(true,"Edit");
  };

  render() {
    return (
      <Card onClick={this.cardclick} data-id={this.props.iden}>
        <Card.Content>
          <Card.Description>
          {this.props.lastname}, {this.props.firstname} {this.props.middlename.charAt(0).toUpperCase()}.
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default view(card);
