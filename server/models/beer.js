const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerSchema = new Schema({
  name: String,
  brewery: Number,
  type: String,
  hops: [String],
  malts: [String],
  abv: Number,
  ibu: Number
});

const Beer = mongoose.model('beer', BeerSchema);

module.exports = Beer;