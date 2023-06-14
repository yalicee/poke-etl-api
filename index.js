const { fetchSinglePokemon } = require("./__utils__/api");

const getAllPokemon = () => {
  const pokemonArr = [];
  for (let i = 1; i <= 10; i++) {
    pokemonArr.push(fetchSinglePokemon(i));
  }
  let x;
  return Promise.all(pokemonArr).then((result) => {
    return result;
  });
};

module.exports = {
  getAllPokemon,
};
