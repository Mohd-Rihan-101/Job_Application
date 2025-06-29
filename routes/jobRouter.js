const exprress = require("express");
const router = exprress.Router();

const { createJob } = require("../controllers/jobController");
const { getJob } = require("../controllers/jobController");
const { updateJob } = require("../controllers/jobController");
const { deletJob } = require("../controllers/jobController");


//use controller as a callback
router.post("/", createJob);
router.get("/", getJob);
router.put("/:id", updateJob);
router.delete('/:id', deletJob);
module.exports = router;
