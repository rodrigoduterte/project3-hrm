//clean
import React, { Component } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { view } from "react-easy-state";
import "semantic-ui-css/semantic.min.css";

import { appstore } from "../../stores/store";

class menu extends Component {
  revealModulePage(e) {
    //get module and submodule of clicked item
    const mod = e.currentTarget.getAttribute("data-module").toLowerCase();
    const submodule = e.currentTarget
      .getAttribute("data-submodule")
      .toLowerCase();
    //set current module and submodule
    appstore.common.do.setCurrentModule(mod);
    appstore.common.do.setCurrentSubModule(submodule);

    //activate the clicked submodule //redundant state
    // appstore.common.do.activateSubModule();
  }

  render() {
    const titles = appstore.common.do.getModuleTitles();
    const subtitles = appstore.common.do.getVMenuTitlesAndSubtitles();
    const isDisabled = appstore.common.do.isDisabled;

    return (
      <Menu vertical>
        {titles
          ? titles.map(title => {
              return (
                <Dropdown item text={title} disabled={isDisabled(title)}>
                  <Dropdown.Menu>
                    {subtitles
                      ? subtitles.filter(sub => sub.submodule).map(subtitle => (
                            <Dropdown.Item
                              text={subtitle.submodule}
                              data-module={title}
                              data-submodule={subtitle.submodule}
                              onClick={this.revealModulePage}
                            >{subtitle.submodule}</Dropdown.Item>
                      ))
                      : null}
                  </Dropdown.Menu>
                </Dropdown>
              );
            })
          : null}
      </Menu>
    );
  }
}

export default view(menu);
