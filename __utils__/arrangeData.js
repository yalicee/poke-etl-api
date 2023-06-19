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
  const allPokemon = pokemonData.map(({ id, name, height, weight, sprite }) => [
    id,
    name,
    height,
    weight,
    sprite,
  ]);
  return allPokemon;
};

const arrangePokemonTypeData = (pokemonData, typeData) => {
  const lookup = lookupCreator(typeData);
  const finalPokemonTypeData = [];
  pokemonData.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      finalPokemonTypeData.push([pokemon.id, lookup[type]]);
    });
  });
  return finalPokemonTypeData;
};

const lookupCreator = (typeData) => {
  const lookupObj = {};
  typeData.forEach((type) => {
    lookupObj[type.type_name] = type.type_id;
  });
  return lookupObj;
};

module.exports = {
  arrangeMovesData,
  arrangeTypesData,
  arrangePokemonData,
  arrangePokemonTypeData,
};
