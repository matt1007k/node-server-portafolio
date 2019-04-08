const express = require("express");

const {
  index,
  create,
  update,
  destroy
} = require("../controllers/projects_controller");
const { mdverifyToken } = require("../middlewares/authenticated");

const router = express.Router();

router
  .route("/")
  .get(mdverifyToken, index)
  .post(mdverifyToken, create);

router
  .route("/:id")
  .put(mdverifyToken, update)
  .delete(mdverifyToken, destroy);

module.exports = router;
