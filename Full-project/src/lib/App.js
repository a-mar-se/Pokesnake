import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage.js';
import Play from '../pages/Play.js';
import Pokedex from '../pages/Pokedex.js';
import GetAllPokemon from './components/getAllPokemon.js';
import PokedexList from './components/PokedexList.js';

class App extends React.Component {
  state = {
    collectedPokemon: [],
    allPokemon: [],
  };

  // Load resources from API
  async componentDidMount() {
    const allPokemonLoaded = GetAllPokemon();
    this.setState({ allPokemon: allPokemonLoaded });
    console.log('loading resources from API');
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route
              exact
              path="/play"
              render={() => <Play allPokemon={this.state.allPokemon} />}
            />
            <Route
              exact
              path="/pokedex"
              render={() => <PokedexList allPokemon={this.state.allPokemon} />}
            />
            {/* <Route path="/randomPokemon" component={RrandomPokemon} /> */}
            <Route path="/*" component={ErrorPage} />
          </Switch>

          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
