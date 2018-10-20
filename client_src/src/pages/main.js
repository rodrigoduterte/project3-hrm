import React, { Component } from "react";
import { Grid, Visibility } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import VMenu from "../components/menu/v";
import HMenu from "../components/menu/h";
import Holder from "../components/holder/holder";

import { view } from "react-easy-state";
import { appstore, loadData, loadSchema } from "../stores/store";

import pages from "./pages";

class MainPage extends Component {
  componentDidMount() {
    loadSchema();
    loadData();
  }
  render() {
    const appdo = appstore.common.do;
    const currentModule = appdo.getCurrentModule();
    const currentSubModuleTitle = appdo.getCurrentSubModuleTitle();
    const page =
      currentModule && currentSubModuleTitle
        ? pages[ currentModule ][ currentSubModuleTitle ]
        : null;
    return (
      <>
        <HMenu />
        <Grid>
          <Grid.Column width={3}>
            <VMenu />
          </Grid.Column>
          <Grid.Column width={12}>
            <Holder page={page} />
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default view(MainPage);
