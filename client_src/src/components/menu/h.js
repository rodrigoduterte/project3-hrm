// eslint-disable-next-line
//clean
// first horizontal menu located on top
import React, { Component } from "react";

import { Menu } from "semantic-ui-react";
import { view } from "react-easy-state";

import { appstore } from "../../stores/store";
import auth from "../../utils/api/data/auth";
import Search from "../search/search";

import "semantic-ui-css/semantic.min.css";

class menu extends Component {
  constructor(props) {
    super(props);
  }

  handleTitleClick(e, { name }) {
    appstore.common.do.setCurrentCommand(name);
    appstore.common.do.getCurrentMemberID();
    // remove conditionals when there are actions for the other commands
    if (name === "New") {
      appstore.common.do.enableRun(true, "New");
    }
  }

  logoutClick() {
    //change token to "" to trigger logout
    auth.logout();
  }

  returnMainPage() {
    appstore.common.do.resetCurrent();
  }

  render() {
    const appdo = appstore.common.do;

    const activeItem = appdo.getCurrentCommand();
    const mod = appdo.getCurrentModule();
    const submodule = appdo.getCurrentSubModule();
    const submoduleTitle = appdo.getCurrentSubModuleTitle();
    const titles = appdo.getHMenuTitlesOfSubModule();
    const search = appdo.getSearchEnabled();

    return (
      <>
        <Menu>
          <Menu.Item header onClick={this.returnMainPage}>
            ERP ERP
          </Menu.Item>
          {submoduleTitle ? (
            <Menu.Item header>{submoduleTitle}</Menu.Item>
          ) : null}

          {titles
            ? titles.map(title => {
                return (
                  <Menu.Item
                    name={title}
                    data-module={mod}
                    data-submodule={submodule}
                    active={activeItem === title}
                    onClick={this.handleTitleClick}
                  >
                    {title}
                  </Menu.Item>
                );
              })
            : null}

          <Menu.Menu position="right">
            {search ? (
              <Menu.Item>
                <Search />
              </Menu.Item>
            ) : null}
            <Menu.Item name="logout" onClick={this.logoutClick} />
          </Menu.Menu>
        </Menu>
      </>
    );
  }
}

export default view(menu);
