const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    description: String,
    img: String,
    category: {
      type: ObjectId,
      ref: "Category"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Project", projectSchema);
