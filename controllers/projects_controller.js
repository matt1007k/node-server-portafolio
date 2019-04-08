const Project = require("../models/Project");

function index(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Project.find({}, "title description img")
    .populate("category", "title")
    .skip(desde)
    .limit(5)
    .exec((error, projectsDB) => {
      if (error) {
        return res.status(500).json({
          ok: false,
          error
        });
      }

      Project.collection.countDocuments({}, (error, total) => {
        res.status(200).json({
          ok: true,
          projects: projectsDB,
          total
        });
      });
    });
}

function create(req, res) {
  let body = req.body;

  let project = new Project();

  project.title = body.title;
  project.description = body.description;
  project.img = "img.jpg";
  project.category = body.categoryId;

  project.save((error, projectCreated) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        message: "Error project not created",
        error
      });
    }

    res.status(201).json({
      ok: true,
      project: projectCreated
    });
  });
}

function update(req, res) {
  let body = req.body;
  let id = req.params.id;

  Project.findById(id, (error, project) => {
    if (error) {
      return res.status(404).json({
        ok: false,
        error
      });
    }

    if (!project) {
      return res.status(401).json({
        ok: false,
        message: "Project with this id: " + id + " not found"
      });
    }
    project.title = body.title;
    project.description = body.description;
    project.category = body.categoryId;
    project.save((error, projectUpdated) => {
      if (error) {
        return res.status(500).json({
          ok: false,
          message: "Error to update project",
          error
        });
      }

      res.status(200).json({
        ok: true,
        project: projectUpdated
      });
    });
  });
}

function destroy(req, res) {
  let id = req.params.id;

  Project.findByIdAndDelete(id, (error, projectDeleted) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        error
      });
    }

    res.status(200).json({
      ok: true,
      message: "Project deleted successfully"
    });
  });
}

module.exports = { index, create, update, destroy };
