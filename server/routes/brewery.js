const express = require("express");

const router = express.Router();
const Brewery = require("../models/beer");

router.get("/brewery", (req, res, next) => {
  Brewery.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/brewery/:id", (req, res, next) => {
  Brewery.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/brewery/country/:country", (req, res, next) => {
  Brewery.find({ country: req.params.country })
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/brewery", (req, res, next) => {
  if (req.body.name) {
    Brewery.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Required fields are empty",
    });
  }
});

router.delete("/brewery/:id", (req, res, next) => {
  Brewery.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
