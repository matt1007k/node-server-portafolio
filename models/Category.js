const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo es necesario"]
    },
    description: {
      type: String,
      required: [true, "El description es necesario"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Category", categorySchema);
