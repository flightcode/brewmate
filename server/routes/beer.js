const express = require('express');
const router = express.Router();
const Beer = require('../models/beer');

router.get('/beer', (req, res, next) => {
  Beer.find({});
});

router.get('/beer/type/:type', (req, res, next) => {
  Beer.find({ type: req.params.type });
});

router.get('/beer/:id', (req, res, next) => {
  Beer.findById({ _id: req.params.id });
});

router.post('/beer', (req, res, next) => {
  Beer.create(req.body);
});

router.delete('/beer/:id', (req, res, next) => {
  Beer.findByIdAndDelete({ _id: req.params.id });
});

module.exports = router;