const User = require("../models/User");

function index(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limit = req.query.limit || 0;
  limit = Number(limit);

  User.find({}, "name email avatar role")
    .skip(desde)
    .limit(limit)
    .exec((error, users) => {
      if (error) {
        return res.status(500).json(error);
      }
      User.collection.countDocuments({}, (error, conteo) => {
        res.status(200).json({
          ok: true,
          users,
          total: conteo
        });
      });
    });
}

function show(req, res) {
  const id = req.params.id;

  User.findById(id, (error, usuarioDB) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        error
      });
    }

    if (!usuarioDB) {
      return res.status(401).json({
        ok: false,
        message: "El usuario no existe"
      });
    }

    res.status(200).json({
      ok: true,
      usuario: usuarioDB
    });
  });
}

function update(req, res) {
  let id = req.params.id;

  let body = req.body;

  User.findById(id, (error, user) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        error
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "El usuario con este id: " + id + " no existe"
      });
    }

    user.name = body.name;
    user.password = body.password;
    user.role = "ROL_USER";
    user.avatar = "user.png";
    user.save((error, userUpdated) => {
      if (error) {
        return res.status(500).json({
          message: "Error al actualizar el usuario",
          errors: error
        });
      }

      res.status(201).json({
        user: userUpdated
      });
    });
  });
}

module.exports = {
  index,
  show,
  update
};
