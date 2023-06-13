const { getAllPokemon } = require("../index");
const db = require("./index");

const pokemonSeed = () => {
  getAllPokemon().then((result) => {
    console.log(result.length);
  });
  return db
    .query("DROP TABLE IF EXISTS moves")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS types");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS pokemon");
    })
    .then(() => {
      return db.query(`CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    move_name VARCHAR(255) NOT NULL
      );`);
    })
    .then((result) => {
      return db.query("INSERT INTO moves (tackle);");
    });
};

const createTypes = () => {
  return db.query(`CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    move_name VARCHAR(255) NOT NULL
  );`);
};

// const create
pokemonSeed().then(() => {
  return db.end();
});
