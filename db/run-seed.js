const { pokemonSeed } = require("./seed");
const db = require("./index");

pokemonSeed().then(() => {
  return db.end();
});
