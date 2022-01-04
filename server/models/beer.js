const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const BeerSchema = new Schema({
  name: String,
  brewery: Number,
  type: String,
  hops: [String],
  malts: [String],
  abv: Number,
  ibu: Number
});

// Create model for todo
const Beer = mongoose.model('beer', BeerSchema);

module.exports = Beer;