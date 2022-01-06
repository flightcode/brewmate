const express = require("express");

const router = express.Router();
const Beer = require("../controllers/beer");

router.get("/beer", Beer.getAll);

router.get("/beer/:id", Beer.getById);

// router.get('/beer/type/:type', (req, res, next) => {
//   Beer.find({ type: req.params.type })
//     .then((data) => res.json(data))
//     .catch(next);
// });

router.post("/beer", Beer.add);

router.delete("/beer/:id", Beer.remove);

module.exports = router;
