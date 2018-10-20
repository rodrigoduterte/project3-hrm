import React, {Component} from 'react';
import Board from 'react-trello';

export default class page extends Component {

  render() {
    const app = this.props.data.pages["HRM"]["Applications"];
    return (
      <>
        <Board
          editable
          onCardAdd={() => {}}
          data={app}
          laneDraggable={false}
          cardDraggable={true}
          onDataChange={() => {}}
          eventBusHandle={() => {}}
          handleDragStart={() => {}}
          handleDragEnd={() => {}}
        />
      </>
    )
 }
}
