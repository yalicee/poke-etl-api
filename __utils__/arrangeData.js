const arrangeMovesData = (pokemonData) => {
  const allMoves = [];
  pokemonData.forEach((pokemon) => {
    allMoves.push(pokemon.moves);
  });
  const uniqueMoves = [...new Set(allMoves.flat())];

  return uniqueMoves.map((ele) => [ele]);
};

const convertTypeDataToReferenceObject = (typesData) => {
  const typeReference = {};

  for (const type of typesData) {
    typeReference[type.type_name] = type.type_id;
  }

  return typeReference;
};

const formatMovesData = (typesData, movesTypeResult) => {
  const referenceObj = convertTypeDataToReferenceObject(typesData);
  const movesTypesArr = movesTypeResult.map((ele) => {
    return { name: ele.name, type_id: referenceObj[ele.type] };
  });
  return movesTypesArr;
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

const arrangePokemonTypeData = (pokemonData, typesData) => {
  return formatData(pokemonData, typesData, "type");
};

const lookupCreator = (propData, attribute) => {
  const lookupObj = {};
  propData.forEach((prop) => {
    lookupObj[prop[`${attribute}_name`]] = prop[`${attribute}_id`];
  });
  return lookupObj;
};

const arrangePokemonMovesData = (pokemonData, movesData) => {
  return formatData(pokemonData, movesData, "move");
};

const formatData = (pokemonData, propData, attribute) => {
  const lookup = lookupCreator(propData, attribute);
  const formattedArr = [];
  pokemonData.forEach((pokemon) => {
    pokemon[`${attribute}s`].forEach((pokemonAttribute) => {
      formattedArr.push([pokemon.id, lookup[pokemonAttribute]]);
    });
  });
  return formattedArr;
};

module.exports = {
  arrangeMovesData,
  arrangeTypesData,
  arrangePokemonData,
  arrangePokemonTypeData,
  arrangePokemonMovesData,
  formatMovesData,
};
