import React from 'react';

// URL of the API
const url = 'https://pokeapi.co/api/v2/pokemon-form/';

///////const handleEscapeButton = [RandomPokemon];

////handleCatchButton + handleEscapeButton == { Buttons };

const Button = async ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>Play</button>
    </div>
  );
};

export default Button;
