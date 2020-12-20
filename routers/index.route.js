const express = require("express");
const router = express.Router();
const index = require("../controllers/index");

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
