const { getAllPokemon } = require("../index");
const {
  arrangeMovesData,
  arrangeTypesData,
  arrangePokemonData,
  arrangePokemonTypeData,
} = require("../__utils__/arrangeData");
const db = require("./index");
const format = require("pg-format");

const pokemonSeed = async () => {
  const pokemonData = await getAllPokemon();

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
    })
    .then(() => {
      return insertMovesData(pokemonData);
    })
    .then(() => {
      return insertTypesData(pokemonData);
    })
    .then(() => {
      return insertPokemonData(pokemonData);
    })
    .then(() => {
      return getTypesData();
    })
    .then(({ rows }) => {
      return insertPokemonTypeData(pokemonData, rows);
    })
    .then((response) => {});
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
    `CREATE TABLE pokemon (pokemon_id INT UNIQUE, pokemon_name VARCHAR(255), sprite VARCHAR(255), height INT, weight INT);`
  );
};

const createPokemonTypes = () => {
  return db.query(
    `CREATE TABLE pokemon_types (pokemon_types_id INT, pokemon_id INT REFERENCES pokemon(pokemon_id), type_id INT REFERENCES types(type_id));`
  );
};

const createPokemonMoves = () => {
  return db.query(
    `CREATE TABLE pokemon_moves (pokemon_moves_id SERIAL PRIMARY KEY, pokemon_id INT REFERENCES pokemon(pokemon_id), move_id INT REFERENCES moves(move_id));`
  );
};

const insertMovesData = (movesData) => {
  const movesArr = arrangeMovesData(movesData);
  const formatStr = format(
    `INSERT INTO moves (move_name) VALUES %L;`,
    movesArr
  );
  return db.query(formatStr);
};

const insertTypesData = (typesData) => {
  const typesArr = arrangeTypesData(typesData);
  const formatStr = format(
    `INSERT INTO types (type_name) VALUES %L;`,
    typesArr
  );
  return db.query(formatStr);
};

const insertPokemonData = (pokemonData) => {
  const arrangedPokemonData = arrangePokemonData(pokemonData);
  const formatStr = format(
    `INSERT INTO pokemon (pokemon_id, pokemon_name, height, weight, sprite) VALUES %L;`,
    arrangedPokemonData
  );
  return db.query(formatStr);
};

const getTypesData = () => {
  return db.query(`SELECT * FROM types;`);
};

const insertPokemonTypeData = (pokemonData, typeData) => {
  const arrangedPokemonTypeData = arrangePokemonTypeData(pokemonData, typeData);

  const formatStr = format(
    `INSERT INTO pokemon_types (pokemon_id, type_id) VALUES %L;`,
    arrangedPokemonTypeData
  );
  return db.query(formatStr);
};
module.exports = { pokemonSeed };
