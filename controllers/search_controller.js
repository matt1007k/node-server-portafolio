const User = require("../models/User");
const Category = require("../models/Category");
// const Project = require("../models/Project");

function searchAll(req, res) {
  const busqueda = req.params.busqueda;

  const regex = new RegExp(busqueda, "i");
  console.log(busqueda);
  Promise.all([
    searchUsers(busqueda, regex),
    searchCategories(busqueda, regex)
    // searchProjects(busqueda, regex)
  ]).then(items => {
    res.status(200).json({
      ok: true,
      users: items[0],
      categories: items[1]
      //   projects: items[2]
    });
  });
}

function searchCollection(req, res) {
  const entity = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let promesa;

  switch (entity) {
    case "users":
      promesa = searchUsers(busqueda, regex);
      break;
    case "categories":
      promesa = searchCategories(busqueda, regex);
      break;
    default:
      return res.status(400).json({
        ok: false,
        message: "No existe es tipo de entidad"
      });
  }

  promesa.then(data => {
    res.status(200).json({
      ok: true,
      [entity]: data
    });
  });
}

function searchCategories(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Category.find({ title: regex }, (err, categories) => {
      if (err) {
        reject("Error al buscar: ", err);
      } else {
        resolve(categories);
      }
    });
  });
}

// function searchProjects(busqueda, regex) {
//   return new Promise((resolve, reject) => {
//     Project.find({ title: regex })
//       .populate("category", "title description")
//       .exec((err, projects) => {
//         if (err) {
//           reject("Error al buscar: ", err);
//         } else {
//           resolve(projects);
//         }
//       });
//   });
// }

function searchUsers(busqueda, regex) {
  return new Promise((resolve, reject) => {
    User.find({}, "name email role img")
      .or([{ name: regex }, { email: regex }])
      .exec((err, users) => {
        if (err) {
          reject("Error al buscar: ", err);
        } else {
          resolve(users);
        }
      });
  });
}

module.exports = { searchAll, searchCollection };
