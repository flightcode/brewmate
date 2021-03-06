import express from "express";
import { verifyToken } from "../utils/auth";
import * as Beer from "../controllers/beer";

const router = express.Router();

router.get("/", Beer.getAll);
router.get("/id/:id", Beer.getById);
router.get("/name/:name", Beer.getByName);
router.get("/type/:type", Beer.getByType);
// router.get("/brewery/:brewery", Beer.getByBrewery);
router.get("/:id/rating", Beer.getRating);
router.post("/", verifyToken, Beer.add);
router.patch("/:id", verifyToken, Beer.update);
router.delete("/:id", verifyToken, Beer.remove);
router.post("/:id/review", verifyToken, Beer.addReview);
router.delete("/:id/review/:review", verifyToken, Beer.removeReview);

export default router;
