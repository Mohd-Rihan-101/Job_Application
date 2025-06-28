const exprress = require("express");
const router = exprress.Router();

const {createJob} = require("../controllers/jobController");

//use controller as a callback
router.post('/', createJob);

module.exports = router;