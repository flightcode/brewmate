const mongoose = require("mongoose");

const { Schema } = mongoose;

const BeerSchema = new Schema({
  name: { type: String, required: true },
  brewery: Number,
  type: { type: String, required: true },
  hops: [String],
  malts: [String],
  abv: Number,
  ibu: Number,
});

const Beer = mongoose.model("beer", BeerSchema);

module.exports = Beer;
