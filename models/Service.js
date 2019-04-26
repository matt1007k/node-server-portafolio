const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    description: String,
    img: String
  },
  { timestamps: true }
);

module.exports = model("Service", serviceSchema);
