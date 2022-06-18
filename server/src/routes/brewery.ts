import express from "express";
import { verifyToken } from "../utils/auth";
import * as Brewery from "../controllers/brewery";

const router = express.Router();

router.get("/", Brewery.getAll);
router.get("/id/:id", Brewery.getById);
// router.get("/name/:name", Brewery.getByName);
// router.get("/country/:country", Brewery.getByCountry);
router.post("/", verifyToken, Brewery.add);
// router.patch("/:id", verifyToken, Brewery.update);
router.delete("/:id", verifyToken, Brewery.remove);

export default router;
