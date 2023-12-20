const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  try {
    let data;

    if (req.query.is_showing === "true") {
      // If is_showing=true is provided, filter movies based on movies_theaters table
      data = await moviesService.listShowing();
    } else {
      data = await moviesService.list();
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res, next) {
  const { product: data } = res.locals;
  res.json({ data });
}


module.exports = {
    read: [asyncErrorBoundary(movieExists), read],
    list: asyncErrorBoundary(list),
};