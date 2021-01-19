const express = require("express");
const router = express.Router();
const cartModel = require("../models/cart.model");
const courseModel = require("../models/course.model");

router.get("/", (req, res) => {
  req.session.retUrl = req.originalUrl;
  console.log(req.session.cart);
  res.render("vwCart/cart");
});

router.post("/add/:id", async (req, res) => {
  const courseId = req.params.id;
  console.log(courseId);
  const courseItem = await courseModel.single(courseId);
  console.log(courseItem);

  
  res.redirect(req.session.retUrl);
});
module.exports = router;
