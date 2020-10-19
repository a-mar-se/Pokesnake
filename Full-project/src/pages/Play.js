import React from 'react';

import { useState } from 'react';

import GameBoard from '../lib/components/GameBoard.js';
import Controlers from '../lib/components/Controlers.js';

import {
  SNAKE_START,
  APPLE_START,
  SPEED,
  DIRECTIONS,
  WIDTH,
} from '../lib/constants.js';

const Play = () => {
  const [snake, setSnake] = useState(SNAKE_START);

  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const allCells = [];

  setTimeout(playing, speed);

  function playing() {
    moveSnake();
  }
  function generateBoard() {
    for (let i = 0; i < WIDTH ** 2; i++) {
      allCells.push(i);
    }
    console.log(allCells);
  }
  generateBoard();

  function moveSnake() {
    let snakeHead = snake[0];
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    switch (dir) {
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
    setSnake(snakeCopy);
  }

  function changeDirection(direction) {
    console.log({ direction });

    setDir(direction);
    moveSnake();
  }

  return (
    <main className="page home">
      <Controlers
        moveLeft={() => changeDirection('left')}
        moveUp={() => changeDirection('up')}
        moveDown={() => changeDirection('down')}
        moveRight={() => changeDirection('right')}
      />{' '}
      <div className="gameBoard">
        {allCells.map((cell, i) => {
          if (snake.includes(i)) {
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
};

export default Play;
