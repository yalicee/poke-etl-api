const {
  fetchSinglePokemon,
  fetchAllMoves,
  fetchSingleMove,
} = require("./__utils__/api");
const { arrangeMovesData } = require("./__utils__/arrangeData");

const getAllPokemon = (numOfPokemon = 151) => {
  const pokemonArr = [];
  for (let i = 1; i <= numOfPokemon; i++) {
    pokemonArr.push(fetchSinglePokemon(i));
  }
  return Promise.all(pokemonArr).then((result) => {
    return result;
  });
};

//get all moves from api /
const getMovesType = async (pokemonData) => {
  const movesFromApi = await fetchAllMoves();
  const movesArr = arrangeMovesData(pokemonData).flat();

  const filteredMoves = movesFromApi.filter((APImove) =>
    movesArr.find((move) => {
      return move === APImove.name;
    })
  );
  const arr = filteredMoves.map((move) => {
    return fetchSingleMove(move);
  });

  return Promise.all(arr);
};
//get moves from db
//those that match make a request - fetch single moves

module.exports = {
  getAllPokemon,
  getMovesType,
};
