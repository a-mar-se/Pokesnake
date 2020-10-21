import React from 'react';

// import { useEffect } from 'react';

// import GameBoard from '../lib/components/GameBoard.js';
import Controlers from '../lib/components/Controlers.js';
import {
  updateSnake,
  updateApples,
  appearNewApple,
  updateCompanions,
} from '../lib/components/functions.js';

import PokemonOnScreen from '../lib/components/PokemonOnScreen.js';
import {
  SNAKE_START,
  APPLE_START,
  SPEED,
  DIRECTION,
  WIDTH,
  ALLCELLS,
  SPEED_INCREASE,
  INITIAL_POKEMONS,
} from '../lib/constants.js';

var tickTackClock;
class Play extends React.Component {
  state = {
    // snake: SNAKE_START,
    snake: [2, 1, 0],
    allcells: ALLCELLS,
    direction: DIRECTION,
    speed: SPEED,
    load: false,
    apples: [],
    intervalId: null,
    speedIncrease: SPEED_INCREASE,
    load: true,
    pokemonsCollected: [],
  };

  initSnake = () => {
    INITIAL_POKEMONS.map((initialPokemon, jj) => {
      {
        this.props.allPokemon.map((i) => {
          if (i.id == initialPokemon) {
            const pokemons = this.state.pokemonsCollected;
            pokemons.push({
              position: jj,
              img: i.img,
            });
            this.setState({
              pokemonsCollected: pokemons,
            });
          }
        });
      }
    });
  };

  moveSnake = () => {
    const snakeCopy = updateSnake(this.state.direction, this.state.snake);
    // this.setState({ snake: snakeCopy });
    console.log(this.state);
    console.log(this.state.pokemonsCollected);
    const newCollectedPokemon = updateCompanions(
      this.state.pokemonsCollected,
      snakeCopy,
    );
    // Function: put snake positions inside collected pokemon
    this.setState({
      pokemonsCollected: newCollectedPokemon,
      snake: snakeCopy,
    });
    console.log({ newCollectedPokemon });
    console.log(this.state.pokemonsCollected);
    // this.setState({ load: true }, () => {
    //   this.setState({
    //     collectedPokemon: newCollectedPokemon,
    //     snake: snakeCopy,
    //   });

    //   this.setState({ load: false });
    // });

    // console.log(this.state.collectedPokemon);
    // this.checkIfEats();
    // this.updateGameBoard();
  };

  updateGameBoard() {
    const allCellsCopy = ALLCELLS;
    this.state.pokemonsCollected.map((pokemon, i) => {
      // console.log({ pokemon });
      // allCellsCopy.splice(pokemon.position, 1, pokemon.pokemonNumber);
      // this.setState({ allcells: allCellsCopy });
      // console.log(this.state.allcells);
    });
  }

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
        {
          // pokemonsCollected: { snake: snakeCopy },
          speed: spp,
          apples: applesCopy,
        },
        () => {
          // console.log(previousApples);
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
    this.initSnake();
    this.appearApple();
    window.addEventListener('keydown', this.handleKeyPress);
    // setTimeout(this.startTimer, 1);
  }

  render() {
    return (
      <main className="page home">
        <Controlers
          moveLeft={() => this.changeDirection('left')}
          moveUp={() => this.changeDirection('up')}
          moveDown={() => this.changeDirection('down')}
          moveRight={() => this.changeDirection('right')}
        />
        <div className="gameBoard">
          {this.state.allcells.map((cell, i) => {
            // console.log(this.props.img);
            return (
              <>
                <div className="celll" key="i">
                  {this.state.pokemonsCollected.map((pokemon) => {
                    if (cell == pokemon.position) {
                      return (
                        <PokemonOnScreen
                          img={pokemon.img}
                          name={pokemon.name}
                          key={pokemon.id}
                          id={pokemon.id}
                        />
                      );
                    }
                  })}
                </div>
              </>
            );
          })}
        </div>
      </main>
    );
  }
}

export default Play;
