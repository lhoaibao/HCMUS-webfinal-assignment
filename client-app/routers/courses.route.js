const express = require("express");
const subCategoryModel = require("../models/subCategory.model");
const categoriesModel = require("../models/categories.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/user.model");
const courseService = require("../services/course");
const router = express.Router();

router.get("/detail/:id", async (req, res) => {
  const courseID = req.params.id;

  // Course Item
  const courseItem = await courseModel.single(courseID);

  // Convert blob image to base64
  courseItem.imgSrc = courseService.convertBlobToBase64(courseItem.courseImage);

  //Get category
  const category = await subCategoryModel.single(courseItem.categoryId);

  // Teacher of course: is queried by authorId
  let userTeacher = await userModel.single(courseItem.userId);
  if (userTeacher !== null) {
    courseItem.authorName = userTeacher.firstName + " " + userTeacher.lastName;
  }

  res.render("vwCourses/courseDetail", {
    courseItem: courseItem,
    userTeacher: userTeacher,
    category: category,
  });
});
module.exports = router;
