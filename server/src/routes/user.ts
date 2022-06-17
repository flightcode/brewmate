import express from "express";
import { verifyToken } from "../utils/auth";
import * as User from "../controllers/user";

const router = express.Router();

router.get("/user", verifyToken, User.getSelf);
router.post("/user/login", User.logIn);
router.post("/user/register", User.register);

export default router;
