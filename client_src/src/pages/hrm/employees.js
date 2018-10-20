import React, { Component } from "react";
import Card from "../../components/card/card";
import { Grid, Visibility } from "semantic-ui-react";
import Menu from "../../components/menu/h2";
import Modal from "../../components/modal/form";
import { appstore } from "../../stores/store";
import { view } from "react-easy-state";

import "semantic-ui-css/semantic.min.css";

class page extends Component {
  constructor(props) {
    super(props);
  }

  setSettings() {
    const appdo = appstore.common.do;
    appdo.setCurrentModel("HsHrEmployee");
    appdo.setCurrentMemberIDType("empnumber");
  }

  render() {
    this.setSettings();

    const appdo = appstore.common.do;

    const isRunEnabledFor = appdo.isRunEnabledFor;

    const allmembers = appdo.records.getAscRecords();

    return (
      <>
        <Menu/>
        <Grid columns={3}>
          {allmembers.map(member => {
            return (
              <Grid.Column>
                <Card iden={member.empnumber}
                firstname={member.empfirstname}
                middlename={member.empmiddlename}
                lastname={member.emplastname}/>
              </Grid.Column>
            );
          })}
        </Grid>
        <Modal
          title={`${ isRunEnabledFor('New') ? 'New' : 'Edit' } Employee`}
          open={ isRunEnabledFor('New') || isRunEnabledFor('Edit') }
        />
      </>
    );
  }
}

export default view(page);
