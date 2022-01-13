const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const User = require("../models/user");

exports.isAuth = (req, res) => {
  User.findOne({ _id: req.params.id }, "name -_id").then((data) =>
    res.json(data)
  );
};

exports.logIn = (req, res) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push({ email: "required" });
  }

  if (!password) {
    errors.push({ password: "required" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  User.findOne({ email }).then((data) => {
    if (!data) {
      return res.status(404).json({ errors: [{ email: "not found" }] });
    }

    bcrypt.compare(password, data.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(403).json({ errors: [{ password: "incorrect" }] });
      }

      jwt.sign(
        { id: data._id },
        process.env.TOKEN_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.status(500).json({ errors: err });
          }

          if (token) {
            return res
              .status(200)
              .json({ message: "success", token: `Bearer ${token}` });
          }
        }
      );
    });
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name) {
    errors.push({ name: "required" });
  }

  if (!email) {
    errors.push({ email: "required" });
  }

  if (!password) {
    errors.push({ password: "required" });
  }

  if (await User.exists({ name })) {
    errors.push({ name: "already exists" });
  }

  if (await User.exists({ email })) {
    errors.push({ email: "already exists" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  const user = new User({
    name,
    email,
    password,
  });

  user.password = await bcrypt.hash(user.password, 10);

  user
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "user created",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        errors: err,
      });
    });
};
