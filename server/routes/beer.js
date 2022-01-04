const express = require('express');
const router = express.Router();
const Beer = require('../models/beer');

router.get('/beer', (req, res, next) => {
    Beer.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/beer/:id', (req, res, next) => {
  Beer.findById({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/beer/type/:type', (req, res, next) => {
  Beer.find({ type: req.params.type })
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/beer', (req, res, next) => {
  if(req.body.name && req.body.type) {
    Beer.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
      res.json({
          error: "Required fields are empty"
      });
  }
});

router.delete('/beer/:id', (req, res, next) => {
  Beer.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;