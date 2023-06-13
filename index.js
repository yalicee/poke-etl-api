const { fetchSinglePokemon } = require("./__utils__/api");

const getAllPokemon = () => {
  const pokemonArr = [];
  for (let i = 1; i <= 10; i++) {
    // fetchSinglePokemon(i).then((pokemon) => {
    //   pokemonArr.push(pokemon);
    // });
    pokemonArr.push(fetchSinglePokemon(i));
  }
  let x;
  return Promise.all(pokemonArr).then((result) => {
    // x = result;
    return result;
  });
  return x;
};

module.exports = {
  getAllPokemon,
};
