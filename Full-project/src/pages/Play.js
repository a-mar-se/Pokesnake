import React from 'react';

import { useEffect } from 'react';

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
// import moveSnake from '../lib/components/moveSnake.js';

class Play extends React.Component {
  state = {
    snake: SNAKE_START,
    allcells: ALLCELLS,
    apple: APPLE_START,
    direction: DIRECTION,
    speed: SPEED,
    load: false,
    time: 0,
    playing: false,
    apples: [],
  };

  moveSnake = () => {
    let snakeHead = this.state.snake[0];
    const snakeCopy = JSON.parse(JSON.stringify(this.state.snake));
    switch (this.state.direction) {
      case 'up':
        if (snakeHead < WIDTH) {
          snakeHead = snakeHead + WIDTH * (WIDTH - 1);
        } else {
          snakeHead = snakeHead - WIDTH;
        }
        break;
      case 'down':
        if (snakeHead > WIDTH * (WIDTH - 1)) {
          snakeHead = snakeHead - WIDTH * (WIDTH - 1);
        } else {
          snakeHead = snakeHead + WIDTH;
        }
        break;
      case 'left':
        if (snakeHead % WIDTH == 0) {
          snakeHead = snakeHead + WIDTH - 1;
        } else {
          snakeHead = snakeHead - 1;
        }
        break;
      case 'right':
        if (snakeHead % WIDTH == WIDTH - 1) {
          snakeHead = snakeHead - WIDTH + 1;
        } else {
          snakeHead = snakeHead + 1;
        }
        break;
    }
    snakeCopy.pop();
    snakeCopy.unshift(snakeHead);
    return this.setState({ snake: snakeCopy });
  };

  changeDirection = (direc) => {
    this.setState({ load: true }, () => {
      this.setState({ direction: direc }, () => {
        this.moveSnake();
        this.setState({ load: false });
      });
    });
  };

  handleKeyPress = (event) => {
    const keyDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const directions = ['up', 'down', 'left', 'right'];
    if (keyDirections.indexOf(event.key) != -1) {
      this.changeDirection(directions[keyDirections.indexOf(event.key)]);
    }
  };

  appearApple() {
    function generateNumber() {
      return Math.floor(Math.random() * WIDTH);
    }
    // Generate random coordinates for the apple
    let wrongPosition = true;
    const applePositions = this.state.apples;
    console.log(applePositions);
    while (wrongPosition) {
      const applePositionx = 1 + generateNumber();

      const applePositiony = 1 + generateNumber();
      const newApple = applePositionx + applePositiony * WIDTH;
      applePositions.push(newApple);

      wrongPosition = this.state.snake.includes(newApple);
      if (newApple == SNAKE_START) {
        wrongPosition = true;
      }
      this.setState({ apples: applePositions });

      console.log(`Apple created at position ${newApple}`);
    }
  }

  runTime() {
    this.setState({ playing: true, time: this.state.time });
    this.timer = setTimeout(() => {
      console.log('tick tack');
      this.moveSnake();
    }, 300);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
    this.appearApple();
    // this.runTime();
  }

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
              if (this.state.apples.includes(i)) {
                return (
                  <div className="apple" key={cell}>
                    {i + 1}
                  </div>
                );
              }
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
