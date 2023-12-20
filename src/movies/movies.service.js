const knex = require("../db/connection");

async function list() {
    return knex("movies").select("*");
}

async function listShowing() {
  return knex("movies_theaters as mt")
    .join("movies", "mt.movie_id", "movies.movie_id")
    .select("movies.*")
    .where({ "mt.is_showing": true })
    .groupBy("movies.movie_id");
}

async function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}


module.exports = {
    list,
    listShowing,
    read,
}
