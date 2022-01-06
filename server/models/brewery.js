const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrewerySchema = new Schema(
  {
    name: { type: String, required: true },
    country: String,
    website: String,
  },
  { timestamps: true }
);

const Brewery = mongoose.model("brewery", BrewerySchema);

module.exports = Brewery;
