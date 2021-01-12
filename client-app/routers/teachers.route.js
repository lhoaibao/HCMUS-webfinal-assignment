const express = require("express");

const router = express();

router.get("/", (req, res) => {
  res.render("vwTeachers/teachers");
});

module.exports = router;
