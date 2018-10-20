//clean
// second horizontal menu below the first
import letters from '../../utils/ops/array/letters';
import { appstore } from '../../stores/store';

import React, {Component} from 'react';
import { view } from "react-easy-state";
import { Menu } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

class menu extends React.Component {

  itemClick = (e, { name }) => {
    appstore.common.do.setCurrentLetter(name);
  }

  render() {
    return (
      <Menu>
      {letters.map(letter => {
        return <Menu.Item style={{"width":"35px","textAlign": "center"}} name={letter} onClick={this.itemClick}>{letter}</Menu.Item>
      })}
      </Menu>
    );
  }
}

export default view(menu);
