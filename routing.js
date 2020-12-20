const express = require("express");
const router = express.Router();

//Router
const index = require("./routers/index.route");
const categories = require("./routers/categories.route");

// Use Router
router.use("/", index);
router.use("/categories", categories);

module.exports = router;
