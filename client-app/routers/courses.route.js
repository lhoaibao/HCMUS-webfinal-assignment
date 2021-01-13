const express = require("express");
const categoriesModel = require("../models/categories.model");
const courseModel = require("../models/course.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const allCategory = await categoriesModel.all();
  const courses = await courseModel.all();
  // console.log(allCategory);
  // Handle category quantity

  for (let i = 0; i < allCategory.length; i++) {
    const catItem = allCategory[i];
    const catQuantity = await courseModel.getQuantityByCategory(catItem.id);
    allCategory[i].catQuantity = catQuantity.length;
  }
  // Hanle course item
  for (let i = 0; i < courses.length; i++) {
    const catItem = await categoriesModel.single(courses[i].category);

    let base = Buffer.from(courses[i].courseImage);
    let conversion = base.toString("base64");
    if (courses[i].courseName.length >= 60)
      courses[i].courseName = courses[i].courseName.slice(0, 60) + "...";
    if (courses[i].authorName.length >= 20)
      courses[i].authorName = courses[i].authorName.slice(0, 20) + "...";
    courses[i].img = conversion;
    courses[i].catName = catItem.category_name;
  }
  res.render("vwCourses/courses", {
    categories: allCategory,
    courses: courses,
  });
});

router.get("/detail/:id", async (req, res) => {
  const courseID = req.params.id;
  const courseItem = await courseModel.single(courseID);
  console.log(courseItem)
  res.render("vwCourses/courseDetail");
});
module.exports = router;
