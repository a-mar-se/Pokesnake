import React, { useState } from 'react';

class GameBoard extends React.Component {
  state = {
    allCells: [],
  };

  generateBoard() {
    for (let i = 0; i < 225; i++) {
      this.state.allCells.push(i);
    }
    console.log(this.state.allCells);
  }

  render() {
    this.generateBoard();
    return (
      <div className="gameBoard">
        {this.state.allCells.map((cell, i) => (
          <div className="cell" key={cell}>
            {i + 1}
          </div>
        ))}
      </div>
    );
  }
}

export default GameBoard;
