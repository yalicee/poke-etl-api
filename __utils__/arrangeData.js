const { all } = require("axios");

const arrangeMovesData = (pokemonData) => {
  const allMoves = [];
  pokemonData.forEach((pokemon) => {
    allMoves.push(pokemon.moves);
  });
  const uniqueMoves = [...new Set(allMoves.flat())];
  return uniqueMoves;
};

module.exports = { arrangeMovesData };
