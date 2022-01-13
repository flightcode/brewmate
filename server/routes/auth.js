const express = require("express");

const router = express.Router();
const Auth = require("../controllers/auth");

const { verifyToken } = require("../utils/auth");

router.post("/login", Auth.logIn);
router.post("/register", Auth.register);
router.post("/isAuth", verifyToken, Auth.isAuth);

module.exports = router;
