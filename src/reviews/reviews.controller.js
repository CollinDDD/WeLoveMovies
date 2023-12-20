const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "score",
  "content",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

const hasRequiredProperties = hasProperties("score", "content");


async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
    
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function update(req, res) {
    const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  }
  const data = await reviewsService.update(updatedReview);
  res.json({ data });
}



module.exports = {
    update: [
    asyncErrorBoundary(reviewExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
    ],
    
};