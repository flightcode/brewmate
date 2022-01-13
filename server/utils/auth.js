const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ errors: [{ token: "required" }], isLoggedIn: false });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ errors: [{ token: "invalid" }], isLoggedIn: false });
    }

    req.user = {};
    req.user.id = decoded.id;
    next();
  });
};
