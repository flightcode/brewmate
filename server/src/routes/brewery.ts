import express from "express";
import * as Brewery from "../controllers/brewery";

const router = express.Router();

router.get("/brewery", Brewery.getAll);
router.get("/brewery/:id", Brewery.getById);
// router.get("/brewery/country/:country", (req, res, next) => {
//   Brewery.find({ country: req.params.country })
//     .then((data) => res.json(data))
//     .catch(next);
// });
router.post("/brewery", Brewery.add);
router.delete("/brewery/:id", Brewery.remove);

export default router;
