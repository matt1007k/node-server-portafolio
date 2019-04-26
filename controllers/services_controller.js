const Service = require("../models/Service");

function getAllByAscTitle(req, res) {
  let titleAsc = [["title", "asc"]];

  Service.find({}, "title")
    .sort(titleAsc)
    .exec((error, servicesDB) => {
      if (error) {
        return res.status(500).json({
          ok: false,
          error
        });
      }

      res.status(200).json({
        ok: true,
        services: servicesDB
      });
    });
}

function index(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limit = req.query.limit || 5;
  limit = Number(limit);

  Service.find({}, "title description img")
    .skip(desde)
    .limit(limit)
    .exec((error, servicesDB) => {
      if (error) {
        return res.status(500).json(error);
      }
      Service.collection.countDocuments({}, (error, totalc) => {
        res.status(200).json({
          services: servicesDB,
          total: totalc
        });
      });
    });
}

function create(req, res) {
  let body = req.body;
  console.log(body);

  let service = new Service();

  service.title = body.title;
  service.description = body.description;
  service.img = "services.png";

  service.save((error, serviceCreated) => {
    if (error) {
      return res.status(500).json(error);
    }

    res.status(200).json({
      ok: true,
      service: serviceCreated
    });
  });
}

function update(req, res) {
  let id = req.params.id;

  let body = req.body;

  Service.findById(id, (error, service) => {
    if (error) {
      return res.status(500).json(error);
    }

    if (!service) {
      return res.status(401).json({
        ok: false,
        message: "El servicio con este id: " + id + " no existe"
      });
    }

    service.title = body.title;
    service.description = body.description;

    service.save((error, serviceUpdated) => {
      if (error) {
        return res.status(500).json({
          message: "Error al actualizar el servicio",
          errors: error
        });
      }

      res.status(200).json({
        service: serviceUpdated
      });
    });
  });
}

function destroy(req, res) {
  let id = req.params.id;

  Service.findByIdAndDelete(id, (error, serviceDeleted) => {
    if (error) {
      res.status(500).json({
        message: "Error al eliminar la servicio",
        errors: error
      });
    }

    res.status(200).json({
      message: "Servicio eliminada con exito"
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
