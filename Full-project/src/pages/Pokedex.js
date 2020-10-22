import React from 'react';
import PokedexList from '../lib/components/PokedexList.js';

const Pokedex = () => {
  return (
    <main className="pokeFlex">
      <PokedexList allPokemon={this.props.allPokemon} />
    </main>
  );
};

export default Pokedex;
