const arrangeMovesData = (pokemonData) => {
  const allMoves = [];
  pokemonData.forEach((pokemon) => {
    allMoves.push(pokemon.moves);
  });
  const uniqueMoves = [...new Set(allMoves.flat())];
  return uniqueMoves.map((ele) => [ele]);
};

const arrangeTypesData = (pokemonData) => {
  const allTypes = pokemonData.map((pokemon) => pokemon.types);
  const uniqueTypes = [...new Set(allTypes.flat())];
  return uniqueTypes.map((ele) => [ele]);
};

const arrangePokemonData = (pokemonData) => {
  const allPokemon = pokemonData.map((pokeObj) => Object.values(pokeObj));
  console.log(allPokemon);
  return allPokemon;
};

module.exports = { arrangeMovesData, arrangeTypesData, arrangePokemonData };
