const express = require("express");
const categoriesModel = require("../models/categories.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await categoriesModel.all();
  console.log(categories);
  res.render("vwCourses/courses", {
    categories: categories,
  });
});

module.exports = router;
