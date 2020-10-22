import React from 'react';
import PokemonOnScreen from './PokemonOnScreen.js';

class PokedexList extends React.Component {
  render() {
    return (
      <div className="pokeFlex">
        {this.props.allPokemon.map((i) => {
          return (
            <PokemonOnScreen img={i.img} name={i.name} key={i.id} id={i.id} />
          );
        })}
      </div>
    );
  }
}

export default PokedexList;
