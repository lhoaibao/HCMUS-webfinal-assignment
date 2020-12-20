const express = require("express");
const router = express.Router();

//Router
const index = require("./routers/index.route");
const categories = require("./routers/category.route");

// Use Router
router.use("/", index);
router.use("/admin/categories", categories);

module.exports = router;
