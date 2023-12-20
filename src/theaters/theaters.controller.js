const knex = require("../db/connection");
const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require('../utils/map-properties');
const reduceProperties = require('../utils/reduce-properties');

const reduceTheaterAndMoviesConfiguration = {
  theater_id: ['theater_id'],
  name: ['name'],
  address_line_1: ['address_line_1'],
  address_line_2: ['address_line_2'],
  city: ['city'],
  state: ['state'],
  zip: ['zip'],
  updated_at: ['updated_at'], // Adjust this based on your schema
  movie_id: ['movies', null, 'movie_id'],
  title: ['movies', null, 'title'],
  runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
  rating: ['movies', null, 'rating'],
  description: ['movies', null, 'description'],
  image_url: ['movies', null, 'image_url'],
  movie_created_at: ['movies', null, 'movie_created_at'],
  movie_updated_at: ['movies', null, 'movie_updated_at'],
  is_showing: ['movies', null, 'is_showing'],
};

const reduceTheaterAndMovies = reduceProperties('theater_id', reduceTheaterAndMoviesConfiguration);

async function list(req, res, next) {
  const theaters = await theatersService.listTheaters();
  const theatersWithMovies = reduceTheaterAndMovies(theaters);

  res.json({ data: theatersWithMovies });
}

module.exports = {
  list: asyncErrorBoundary(list),
};


