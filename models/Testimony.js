const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const testimonySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    client: {
      type: ObjectId,
      ref: "Client"
    }
  },
  { timestamps: true }
);

module.exports = model("Testimony", testimonySchema);
