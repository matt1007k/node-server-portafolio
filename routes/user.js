const express = require("express");
const router = express.Router();

const { index, show, update } = require("../controllers/users_controller");
const { mdverifyToken } = require("../middlewares/authenticated");

router
  .route("/")
  .get(mdverifyToken, index)
  .post(mdverifyToken, update);

router.route("/:id").get(mdverifyToken, show);

module.exports = router;
