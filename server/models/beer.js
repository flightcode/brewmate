const mongoose = require("mongoose");

const { Schema } = mongoose;

const BeerSchema = new Schema(
  {
    name: { type: String, required: true },
    brewery: String,
    type: { type: String, required: true },
    hops: [String],
    malts: [String],
    abv: Number,
    ibu: Number,
  },
  { timestamps: true }
);

const Beer = mongoose.model("beer", BeerSchema);

module.exports = Beer;
