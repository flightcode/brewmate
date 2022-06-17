import express from "express";
import * as Beer from "../controllers/beer";

const router = express.Router();

router.get("/beer", Beer.getAll);
router.get("/beer/:id", Beer.getById);
router.post("/beer", Beer.add);
router.delete("/beer/:id", Beer.remove);

export default router;
