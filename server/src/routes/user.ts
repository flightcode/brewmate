import express from "express";
import { verifyToken } from "../utils/auth";
import * as User from "../controllers/user";

const router = express.Router();

router.post("/login", User.logIn);
router.post("/register", User.register);
router.get("/", verifyToken, User.getSelf);
router.get("/reviews", verifyToken, User.getReviews);
router.get("/ratings", verifyToken, User.getRatings);
router.get("/:user/reviews", User.getReviews);
router.get("/:user/ratings", User.getRatings);
router.patch("/", verifyToken, User.updateSelf);
router.delete("/", verifyToken, User.deleteSelf);

export default router;
