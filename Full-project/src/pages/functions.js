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

export class Play extends React.Component {
  state = {
    snake: SNAKE_START,
    allcells: ALLCELLS,
    apple: APPLE_START,
    direction: DIRECTION,
    speed: SPEED,
    load: false,
    apples: [],
    intervalId: null,
    speedIncrease: 300,
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
    this.setState({ snake: snakeCopy });
    this.checkIfEats();
  };

  checkIfEats() {
    let snakeHead = this.state.snake[0];
    const snakeCopy = JSON.parse(JSON.stringify(this.state.snake));
    const applesCopy = JSON.parse(JSON.stringify(this.state.apples));

    let spp = this.state.speed;
    for (let i = 0; i < applesCopy.length; i++) {
      const applePosition = applesCopy[i];
      if (snakeHead === applePosition) {
        const speedIncrease = this.state.speedIncrease;
        function eatApple() {
          snakeCopy.push(snakeCopy[snakeCopy.length - 1]);
          applesCopy.splice(applesCopy.indexOf(applePosition), 1);
          spp = spp + speedIncrease;
          console.log(spp);
        }
        eatApple(snakeHead);
        this.setState({ speed: spp });
        this.setState({ apples: applesCopy });
        this.appearApple();

        setInterval(this.runTime(), 1);
      }
    }
    // console.log(`${this.state.apples}`);
    this.setState({ snake: snakeCopy, speed: spp });
    // this.state.intervalId = nuldfl;
  }

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
    let wrongPosition = true;
    let newApple = 100;
    const applePositions = this.state.apples;
    while (wrongPosition) {
      const applePositionx = generateNumber();
      const applePositiony = generateNumber();
      newApple = applePositionx + applePositiony * WIDTH;
      wrongPosition = this.state.snake.includes(newApple);
      if (newApple == SNAKE_START) {
        wrongPosition = true;
      }
    }
    applePositions.push(newApple);
    console.log(`Apple created at position ${newApple}`);
    this.setState({ apples: applePositions });
    console.log(applePositions);
  }

  runTime = () => {
    setInterval(this.moveSnake, 10 ** 6 / this.state.speed);
  };
  startTimer = (event) => {
    setInterval(this.runTime(), 1);
  };

  componentDidMount() {
    this.appearApple();
    window.addEventListener('keydown', this.handleKeyPress);
    setTimeout(this.startTimer, 1);
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
