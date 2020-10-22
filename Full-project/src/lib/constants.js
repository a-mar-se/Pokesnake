const SNAKE_START = [0, -1, -2, -3];
const APPLE_START = [80];
const SPEED = 1 * 3000;
const SPEED_INCREASE = 0;
const DIRECTION = 'right';
const WIDTH = 10;
const INITIAL_POKEMONS = [];
const INITIAL_LENGTH = 4;

function generateCompanions() {
  INITIAL_POKEMONS.push(25);
  INITIAL_POKEMONS.push(7);
  INITIAL_POKEMONS.push(4);
  INITIAL_POKEMONS.push(1);
  // function addPokemon() {
  //   // INITIAL_POKEMONS.push(Math.floor(1 + Math.random() * 152));
  // }
  // for (let i = 0; i < INITIAL_LENGTH; i++) {
  //   addPokemon();
  // }
}

generateCompanions();

const ALLCELLS = [];

function generateBoard(pokemon) {
  for (let i = 0; i < WIDTH ** 2; i++) {
    ALLCELLS.push(i);
  }
  // console.log(ALLCELLS);
}
generateBoard();

export {
  SNAKE_START,
  APPLE_START,
  SPEED,
  DIRECTION,
  WIDTH,
  ALLCELLS,
  SPEED_INCREASE,
  INITIAL_POKEMONS,
};
