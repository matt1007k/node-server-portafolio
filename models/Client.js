const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    position: String,
    img: String
  },
  { timestamps: true }
);

module.exports = model("Client", clientSchema);
