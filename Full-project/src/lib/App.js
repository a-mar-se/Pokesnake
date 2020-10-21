import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage.js';
import Play from '../pages/Play.js';

class App extends React.Component {
  state = {
    collectedPokemon: [],
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/play" component={Play} />
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
