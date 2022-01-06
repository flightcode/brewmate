const express = require("express");

const router = express.Router();
const beer = require("../controllers/beer");

router.get("/beer", beer.getAll);

router.get("/beer/:id", beer.getById);

// router.get('/beer/type/:type', (req, res, next) => {
//   Beer.find({ type: req.params.type })
//     .then((data) => res.json(data))
//     .catch(next);
// });

router.post("/beer", beer.add);

router.delete("/beer/:id", beer.remove);

module.exports = router;
