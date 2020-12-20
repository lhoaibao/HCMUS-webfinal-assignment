const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const categoryModel = require("../models/categories.model");

router.get("/", async (request, response) => {
  const result = await categoryModel.all();
  response.render("categories", {
    categories: result,
    empty: result.length === 0,
  });
});

module.exports = router;

// PROMISE
// const p = db.load(sql);
// p.then((result) => {
//   console.log(result);
//   res.render("categories", {
//     categories: result,
//     empty: result.length === 0,
//   });
// }).catch((error) => {
//   res.send("View error log at server console");
// });

// CALLBACK function
// db.load(sql, (result) => {
//   console.log(result);
//   res.render("categories", {
//     categories: result,
//     empty: result.length === 0,
//   });
// });
