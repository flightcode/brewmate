const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const BrewerySchema = new Schema({
  name: String,
  country: String,
  website: String
});

// Create model for todo
const Brewery = mongoose.model('brewery', BrewerySchema);

module.exports = Brewery;