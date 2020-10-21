import React from 'react';

// import { useEffect } from 'react';

// import GameBoard from '../lib/components/GameBoard.js';
import Controlers from '../lib/components/Controlers.js';
import {
  updateSnake,
  updateApples,
  appearNewApple,
} from '../lib/components/functions.js';

import {
  SNAKE_START,
  APPLE_START,
  SPEED,
  DIRECTION,
  WIDTH,
  ALLCELLS,
  SPEED_INCREASE,
} from '../lib/constants.js';

var tickTackClock;
class Play extends React.Component {
  state = {
    snake: SNAKE_START,
    allcells: ALLCELLS,
    direction: DIRECTION,
    speed: SPEED,
    load: false,
    apples: [],
    intervalId: null,
    speedIncrease: SPEED_INCREASE,
    load: true,
  };

  moveSnake = () => {
    const snakeCopy = updateSnake(this.state.direction, this.state.snake);
    this.setState({ snake: snakeCopy });
    this.checkIfEats();
  };

  checkIfEats() {
    const previousApples = this.state.apples;
    const { snakeCopy, spp, applesCopy } = updateApples(
      this.state.apples,
      this.state.speed,
      this.state.snake,
      this.state.speedIncrease,
    );
    this.setState({ load: true }, () => {
      this.setState(
        { snake: snakeCopy, speed: spp, apples: applesCopy },
        () => {
          console.log(previousApples);
          // console.log(this.state.apples);
          // if ([...previousApples] != [...applesCopy]) {
          //   console.log(`Apple eaten at ${previousApples}`);
          // this.appearApple();
        },
      );

      this.setState({ load: false });
    });
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
    const newApple = appearNewApple(this.state.apples, this.state.snake);
    const applePositions = this.state.apples;
    applePositions.push(newApple);
    console.log(`Apple created at position ${newApple}`);
    this.setState({ apples: applePositions });
  }

  runTime = () => {
    tickTackClock = setInterval(this.moveSnake, 10 ** 6 / this.state.speed);
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
