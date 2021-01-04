const express = require("express");
const router = express.Router();
const categoryModel = require("../models/categories.model");

router.get("/", async (request, response) => {
  const result = await categoryModel.all();
  response.render("categories", {
    categories: result,
    empty: result.length === 0,
  });
});

module.exports = router;
