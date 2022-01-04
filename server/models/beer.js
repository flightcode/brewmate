const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerSchema = new Schema({
  name: { type: String, required: true },
  brewery: { type: Number, required: true },
  type: { type: String, required: true },
  hops: [String],
  malts: [String],
  abv: Number,
  ibu: Number
});

const Beer = mongoose.model('beer', BeerSchema);

module.exports = Beer;