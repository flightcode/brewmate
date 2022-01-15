require("dotenv").config();

const User = require("../models/user");

exports.getName = (req, res, next) => {
  User.findOne({ _id: req.params.id }, "name -_id")
    .then((data) => res.json(data))
    .catch(next);
};
