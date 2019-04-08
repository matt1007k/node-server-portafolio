const Category = require("../models/Category");

function getAllByAscTitle(req, res) {
  let titleAsc = [["title", "asc"]];

  Category.find({}, "title")
    .sort(titleAsc)
    .exec((error, categoriesDB) => {
      if (error) {
        return res.status(500).json({
          ok: false,
          error
        });
      }

      res.status(200).json({
        ok: true,
        categories: categoriesDB
      });
    });
}

function index(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limit = req.query.limit || 5;
  limit = Number(limit);

  Category.find({}, "title description")
    .skip(desde)
    .limit(limit)
    .exec((error, categoriesDB) => {
      if (error) {
        return res.status(500).json(error);
      }
      Category.collection.countDocuments({}, (error, totalc) => {
        res.status(200).json({
          categories: categoriesDB,
          total: totalc
        });
      });
    });
}

function create(req, res) {
  let body = req.body;
  console.log(body);

  let category = new Category();

  category.title = body.title;
  category.description = body.description;

  category.save((error, categoryCreated) => {
    if (error) {
      return res.status(500).json(error);
    }

    res.status(200).json({
      ok: true,
      category: categoryCreated
    });
  });
}

function update(req, res) {
  let id = req.params.id;

  let body = req.body;

  Category.findById(id, (error, category) => {
    if (error) {
      return res.status(500).json(error);
    }

    if (!category) {
      return res.status(401).json({
        ok: false,
        message: "La categoria con este id: " + id + " no existe"
      });
    }

    category.title = body.title;
    category.description = body.description;

    category.save((error, categoryUpdated) => {
      if (error) {
        return res.status(500).json({
          message: "Error al actualizar la categoria",
          errors: error
        });
      }

      res.status(200).json({
        category: categoryUpdated
      });
    });
  });
}

function destroy(req, res) {
  let id = req.params.id;

  Category.findByIdAndDelete(id, (error, categoryDeleted) => {
    if (error) {
      res.status(500).json({
        message: "Error al eliminar la categoria",
        errors: error
      });
    }

    res.status(200).json({
      message: "Categoria eliminada con exito"
    });
  });
}

module.exports = {
  index,
  getAllByAscTitle,
  create,
  update,
  destroy
};
