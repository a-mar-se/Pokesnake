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

const Play = () => {
  const [snake, setSnake] = useState(SNAKE_START);

  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState(DIRECTION);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // setTimeout(playing, speed);

  function playing() {
    moveSnake();
  }

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
    console.log(dir);
    setSnake(snakeCopy);
    // console.log('updatee ');
  }

  function changeDirection(direction) {
    // console.log({ direction });

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
        {ALLCELLS.map((cell, i) => {
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
