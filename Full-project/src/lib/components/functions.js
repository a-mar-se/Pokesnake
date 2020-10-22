import { WIDTH } from '../constants.js';

export function updateCompanions(pokemonsLast, snakeNow) {
  console.log(pokemonsLast);
  const pokemonsCopy = [...pokemonsLast];
  console.log(pokemonsCopy);
  const newPokemons = pokemonsCopy.map((elem) => {
    const { img } = elem;
    const newPosition = snakeNow[pokemonsLast.indexOf(elem)];
    return { position: newPosition, img: img };
  });
  console.log(newPokemons);
  // return [24, 34];
  return newPokemons;
}

export function generateNewWildPokemon(pokemonCollected) {
  function randomPokemon() {
    return Math.floor(1 + Math.random() * 152);
  }
  let wrongPokemon = true;
  let newPok = randomPokemon();
  while (wrongPokemon) {
    wrongPokemon = false;
    newPok = randomPokemon();
    pokemonCollected.map((pokemon) => {
      if (pokemon.id == newPok) {
        wrongPokemon = true;
      }
    });
  }
  return newPok;
}

export function updateSnake(direction, snake) {
  let snakeHead = snake[0];
  const snakeCopy = JSON.parse(JSON.stringify(snake));
  function updatee() {
    switch (direction) {
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
      default:
        console.log('That Key doesn´t do anything...');
    }
    snakeCopy.pop();
    snakeCopy.unshift(snakeHead);
    // console.log(snakeCopy);
  }
  updatee();
  console.log({ snakeCopy });
  return snakeCopy;
}

export function appearNewApple(applePositions, snake) {
  // console.log(applePositions, snake);

  function generateNumber() {
    return Math.floor(Math.random() * WIDTH);
  }
  let wrongPosition = true;
  let newApple = 100;
  // const applePositions = this.state.apples;
  while (wrongPosition) {
    const applePositionx = generateNumber();
    const applePositiony = generateNumber();
    newApple = applePositionx + applePositiony * WIDTH;
    wrongPosition = snake.includes(newApple);
    if (newApple == 0) {
      wrongPosition = true;
    }
  }
  return newApple;
}

export function updateApples(apples, speed, snake, speedIncrease) {
  let snakeHead = snake[0];
  const snakeCopy = JSON.parse(JSON.stringify(snake));
  const applesCopy = JSON.parse(JSON.stringify(apples));
  let spp = speed;

  for (let i = 0; i < applesCopy.length; i++) {
    const applePosition = applesCopy[i];
    if (snakeHead === applePosition) {
      console.log(`Apple eaten at ${snakeHead}`);
      function eatApple() {
        snakeCopy.push(snakeCopy[snakeCopy.length - 1]);
        applesCopy.splice(applesCopy.indexOf(applePosition), 1);
        spp = spp + speedIncrease;
        // console.log(spp);
        applesCopy.push(appearNewApple(applesCopy, snakeCopy));
      }
      eatApple(snakeHead);
    }
  }
  return { applesCopy, spp, snakeCopy };
}
