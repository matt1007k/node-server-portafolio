const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rolValido = {
  values: ["ROL_USER", "ROL_ADMIN"],
  message: "{VALUE} no es un rol valido"
};

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es necesario"]
  },
  email: {
    type: String,
    required: [true, "El correo es necesario"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "La contrasena necesario"]
  },
  role: {
    type: String,
    default: "ROL_USER",
    enum: rolValido
  },
  img: String
});

// TODO: Eliminar el password de un response
userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

module.exports = mongoose.model("User", userSchema);
