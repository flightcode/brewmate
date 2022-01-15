const Beer = require("../models/beer");

exports.getAll = (req, res, next) => {
  Beer.find({})
    .then((data) => res.json(data))
    .catch(next);
};

exports.search = (req, res, next) => {
  const searchTerm = req.params.search;

  Beer.find({
    $or: [
      { name: { $regex: `${searchTerm}` } },
      { type: { $regex: `${searchTerm}` } },
    ],
  })
    .then((data) => res.json(data))
    .catch(next);
};

exports.getById = (req, res, next) => {
  Beer.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
};

exports.add = (req, res, next) => {
  if (req.body.name && req.body.type) {
    Beer.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Required fields are empty",
    });
  }
};

exports.remove = (req, res, next) => {
  Beer.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
};
