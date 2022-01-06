const mongoose = require("mongoose");

const { Schema } = mongoose;

const UeerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UeerSchema);

module.exports = User;
