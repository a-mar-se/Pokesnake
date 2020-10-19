import React, { useState } from 'react';

class Controlers extends React.Component {
  render() {
    return (
      <div className="controlers">
        <button className="left" onClick={this.props.moveLeft}>
          ⬅
        </button>
        <div className="centerButtons">
          <button className="up" onClick={this.props.moveUp}>
            ⬆
          </button>
          <button className="down" onClick={this.props.moveDown}>
            ⬇
          </button>
        </div>
        <button className="right" onClick={this.props.moveRight}>
          ➡
        </button>
      </div>
    );
  }
}

export default Controlers;
