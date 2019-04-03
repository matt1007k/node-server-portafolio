const express = require("express");
const router = express.Router();

const {
  searchAll,
  searchCollection
} = require("../controllers/search_controller");

router.route("/todo/:busqueda").get(searchAll);

router.route("/collection/:tabla/:busqueda").get(searchCollection);

module.exports = router;
