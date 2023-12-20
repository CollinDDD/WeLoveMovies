const knex = require("../db/connection");

async function update(updatedReviews) {
  return knex("reviews")
    .where({ review_id: updatedReviews.review_id })
    .update(updatedReviews, "*")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select(
      "reviews.review_id",
      "reviews.content",
      "reviews.score",
      "reviews.created_at",
      "reviews.updated_at",
      "reviews.critic_id",
      "reviews.movie_id",
      "critics.critic_id as critic.critic_id",
      "critics.preferred_name",
      "critics.surname",
      "critics.organization_name",
      "critics.created_at as critic.created_at",
      "critics.updated_at as critic.updated_at"
    )
    .then((updatedReview) => updatedReview[0]);
}


async function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

module.exports = {
    update,
    read,
}