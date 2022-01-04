const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrewerySchema = new Schema({
  name: { type: String, required: true },
  country: String,
  website: String
});

const Brewery = mongoose.model('brewery', BrewerySchema);

module.exports = Brewery;