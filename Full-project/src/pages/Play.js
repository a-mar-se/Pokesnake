import React from 'react';

import { useState } from 'react';

import GameBoard from '../lib/components/GameBoard.js';
import Controlers from '../lib/components/Controlers.js';

import {
  SNAKE_START,
  APPLE_START,
  SPEED,
  DIRECTION,
  WIDTH,
  ALLCELLS,
} from '../lib/constants.js';

class Play extends React.Component {
  state = {
    snake: SNAKE_START,
    allcells: ALLCELLS,
    apple: APPLE_START,
    direction: '',
    speed: SPEED,
    load: false,
  };

  moveSnake = () => {
    let snakeHead = this.state.snake[0];
    const snakeCopy = JSON.parse(JSON.stringify(this.state.snake));
    switch (this.state.direction) {
      case 'up':
        snakeHead = snakeHead - WIDTH;
        break;
      case 'down':
        snakeHead = snakeHead + WIDTH;
        break;
      case 'left':
        snakeHead = snakeHead - 1;
        break;
      case 'right':
        snakeHead = snakeHead + 1;
        break;
    }
    snakeCopy.pop();
    snakeCopy.unshift(snakeHead);
    console.log(snakeCopy);
    return this.setState({ snake: snakeCopy });
  };

  changeDirection = (direc) => {
    this.setState({ load: true }, () => {
      console.log('changing direction to:');
      console.log(direc);
      console.log(typeof direc);
      this.setState({ direction: direc }, () => {
        this.moveSnake();
        console.log('changing direction to:');
        console.log(this.state.direction);

        this.setState({ load: false });
      });
    });
  };

  render() {
    return (
      <main className="page home">
        <Controlers
          moveLeft={() => this.changeDirection('left')}
          moveUp={() => this.changeDirection('up')}
          moveDown={() => this.changeDirection('down')}
          moveRight={() => this.changeDirection('right')}
        />{' '}
        <div className="gameBoard">
          {ALLCELLS.map((cell, i) => {
            if (this.state.snake.includes(i)) {
              return (
                <div className="snake" key={cell}>
                  {i + 1}
                </div>
              );
            } else {
              return (
                <div className="cell" key={cell}>
                  {i + 1}
                </div>
              );
            }
          })}
        </div>
      </main>
    );
  }
}

export default Play;
