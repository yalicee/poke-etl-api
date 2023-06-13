const { getAllPokemon } = require("../index");
const { arrangeMovesData } = require("../__utils__/arrangeData");
const db = require("./index");

const pokemonSeed = () => {
  getAllPokemon().then((result) => {
    console.log(arrangeMovesData(result));
  });
  return db
    .query("DROP TABLE IF EXISTS pokemon_types")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS pokemon_moves");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS pokemon");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS moves");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS types");
    })
    .then(() => {
      return createMoves();
    })
    .then(() => {
      return createTypes();
    })
    .then(() => {
      return createPokemon();
    })
    .then(() => {
      return createPokemonTypes();
    })
    .then(() => {
      return createPokemonMoves();
    });
};

const createMoves = () => {
  return db.query(`CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    move_name VARCHAR(255) NOT NULL UNIQUE
  );`);
};

const createTypes = () => {
  return db.query(
    `CREATE TABLE types (type_id SERIAL PRIMARY KEY, type_name VARCHAR(255) NOT NULL UNIQUE);`
  );
};

const createPokemon = () => {
  return db.query(
    `CREATE TABLE pokemon (pokemon_id SERIAL PRIMARY KEY, pokemon_name VARCHAR(255), height INT, weight INT, type_id INT REFERENCES types(type_id) NOT NULL );`
  );
};

const createPokemonTypes = () => {
  return db.query(
    `CREATE TABLE pokemon_types (pokemon_types_id SERIAL PRIMARY KEY, pokemon_id INT REFERENCES pokemon(pokemon_id), type_id INT REFERENCES types(type_id));`
  );
};

const createPokemonMoves = () => {
  return db.query(
    `CREATE TABLE pokemon_moves (pokemon_moves_id SERIAL PRIMARY KEY, pokemon_id INT REFERENCES pokemon(pokemon_id), move_id INT REFERENCES moves(move_id));`
  );
};

// const create
module.exports = { pokemonSeed };

//Many pokemon have many types && many types have many pokemon
//SELECT * FROM pokemon WHERE pokemon_id = 3
