const Brewery = require("../models/brewery");

exports.getAll = (req, res, next) => {
  Brewery.find({})
    .then((data) => res.json(data))
    .catch(next);
};

exports.getById = (req, res, next) => {
  Brewery.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
};

exports.add = (req, res, next) => {
  if (req.body.name) {
    Brewery.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Required fields are empty",
    });
  }
};

exports.remove = (req, res, next) => {
  Brewery.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
};
