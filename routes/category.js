const express = require("express");

const {
  index,
  getAllByAscTitle,
  create,
  update,
  destroy
} = require("../controllers/categories_controller");
const { mdverifyToken } = require("../middlewares/authenticated");

const router = express.Router();

router
  .route("/")
  .get(mdverifyToken, index)
  .post(mdverifyToken, create);

router.route("/by-title").get(mdverifyToken, getAllByAscTitle);

router
  .route("/:id")
  .put(mdverifyToken, update)
  .delete(mdverifyToken, destroy);

module.exports = router;
