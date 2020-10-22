// URL of the API
const url = 'https://pokeapi.co/api/v2/pokemon-form/';

function GetAllPokemon() {
  const allPokemon = [];
  async function getPokemonById(i) {
    const newUrl = `${url}${i}/`;
    const res = await fetch(newUrl);
    const pokemonInfo = await res.json();
    const name = pokemonInfo.name;
    const img = pokemonInfo.sprites.front_default;
    const id = i;
    allPokemon.push({ name, img, id });
  }
  for (let i = 1; i < 152; i++) {
    // async function ()  {
    getPokemonById(i);
    // console.log(i);
    // };
  }
  // console.log(allPokemon);
  return allPokemon;
}
export default GetAllPokemon;
