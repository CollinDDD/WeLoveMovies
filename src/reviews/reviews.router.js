const express = require('express');
const router = express.Router();
const controller = require('../reviews/reviews.controller');
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.route("/:reviewId")
    .all(cors())
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;