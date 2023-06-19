const { getAllPokemon, getMovesType } = require("../index");
const {
  arrangeMovesData,
  arrangeTypesData,
  arrangePokemonData,
  arrangePokemonTypeData,
  arrangePokemonMovesData,
  formatMovesData,
} = require("../__utils__/arrangeData");
const db = require("./index");
const format = require("pg-format");

const createMoves = () => {
  return db.query(`CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    move_name VARCHAR(255) NOT NULL UNIQUE);`);
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
    `CREATE TABLE pokemon_types (pokemon_types_id SERIAL PRIMARY KEY, pokemon_id INT REFERENCES pokemon(pokemon_id), type_id INT REFERENCES types(type_id));`
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

const getMoves = () => {
  return db.query(`SELECT * FROM moves;`);
};

const insertPokemonMovesData = (pokemonData, movesData) => {
  const arrangedPokemonMovesData = arrangePokemonMovesData(
    pokemonData,
    movesData
  );
  const formatStr = format(
    `INSERT INTO pokemon_moves (pokemon_id, move_id) VALUES %L`,
    arrangedPokemonMovesData
  );
  return db.query(formatStr);
};

const alterMovesTable = async (movesData) => {
  await db.query(
    `ALTER TABLE moves ADD COLUMN type_id INT REFERENCES types(type_id);`
  );
  for (const move of movesData) {
    await db.query(`UPDATE moves SET type_id = $1 WHERE move_name = $2;`, [
      move.type_id,
      move.name,
    ]);
  }
};

const pokemonSeed = async () => {
  try {
    const pokemonData = await getAllPokemon();

    await db.query("DROP TABLE IF EXISTS pokemon_types");
    await db.query("DROP TABLE IF EXISTS pokemon_moves");
    await db.query("DROP TABLE IF EXISTS pokemon");
    await db.query("DROP TABLE IF EXISTS moves");
    await db.query("DROP TABLE IF EXISTS types");

    await createMoves();
    await createTypes();
    await createPokemon();
    await createPokemonTypes();
    await createPokemonMoves();

    await insertMovesData(pokemonData);
    await insertTypesData(pokemonData);
    await insertPokemonData(pokemonData);

    const typesResult = await getTypesData();
    const typesData = typesResult.rows;
    await insertPokemonTypeData(pokemonData, typesData);
    const movesResult = await getMoves();
    const movesData = movesResult.rows;
    await insertPokemonMovesData(pokemonData, movesData);

    const movesTypeResult = await getMovesType(pokemonData);
    const formattedMoves = formatMovesData(typesData, movesTypeResult);
    await alterMovesTable(formattedMoves);
    console.log("Pokemon data seeded successfully!");
  } catch (error) {
    console.error("An error occurred while seeding Pokemon data:", error);
  }
};

module.exports = { pokemonSeed, getTypesData };
