const express = require("express");

const router = express.Router();

const User = require("../controllers/user");
const Auth = require("../controllers/auth");

const { verifyToken } = require("../utils/auth");

router.post("/user/login", Auth.logIn);
router.post("/user/register", Auth.register);
router.get("/user/isAuth", verifyToken, Auth.isAuth);
router.get("/user/name", User.getName);

module.exports = router;
