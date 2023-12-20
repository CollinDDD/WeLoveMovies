const knex = require("../db/connection");



async function listTheaters() {
  return knex('theaters as t')
    .join('movies_theaters as mt', 'mt.theater_id', 't.theater_id')
    .join('movies as m', 'mt.movie_id', 'm.movie_id')
    .select(
      't.theater_id',
      't.name',
      't.address_line_1',
      't.address_line_2',
      't.city',
      't.state',
      't.zip',
      'm.movie_id',
      'm.title',
      'm.runtime_in_minutes',
      'm.rating',
      'm.description',
      'm.image_url',
      'm.created_at as movie_created_at',
      'm.updated_at as movie_updated_at',
      'mt.is_showing'
    );
}

module.exports = {
    listTheaters,
}