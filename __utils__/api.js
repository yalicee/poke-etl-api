const axios = require("axios");

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const fetchSinglePokemon = (pokeId) => {
  return pokeApi
    .get(`/pokemon/${pokeId}/`)
    .then(({ data }) => {
      const { name, height, weight, moves, sprites, types, id } = data;
      return {
        name,
        height,
        weight,
        moves: moves.map((move) => move.move.name),
        sprite: sprites.front_default,
        types: types.map((type) => type.type.name),
        id,
      };
    })
    .catch((err) => {
      return err;
    });
};

const fetchSingleMove = async ({ url }) => {
  const { data } = await pokeApi.get(`${url}`);
  return {
    name: data.name,
    type: data.type.name,
  };
};

const fetchAllMoves = async () => {
  const {
    data: { results },
  } = await pokeApi.get(`/move?limit=100000`);
  return results;
};

module.exports = {
  fetchSinglePokemon,
  fetchAllMoves,
  fetchSingleMove,
};
