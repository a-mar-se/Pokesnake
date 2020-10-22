export function moveSnake() {
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
  // console.log(snakeCopy);
  return this.setState({ snake: snakeCopy });
}
