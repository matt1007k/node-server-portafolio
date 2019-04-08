const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
