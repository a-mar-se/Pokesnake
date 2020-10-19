const SNAKE_START = [0, 0, 0];
const APPLE_START = [80];
const SPEED = 3000;
const DIRECTION = 'right';
const WIDTH = 10;

const ALLCELLS = [];

function generateBoard() {
  for (let i = 0; i < WIDTH ** 2; i++) {
    ALLCELLS.push(i);
  }
  // console.log(ALLCELLS);
}
generateBoard();

export { SNAKE_START, APPLE_START, SPEED, DIRECTION, WIDTH, ALLCELLS };
