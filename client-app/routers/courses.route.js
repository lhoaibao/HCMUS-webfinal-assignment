const express = require("express");
const categoriesModel = require("../models/categories.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/user.model");
const courseService = require("../services/course");
const router = express.Router();

router.get("/", async (req, res) => {
  const allCategory = await categoriesModel.all();
  const courses = await courseModel.all();
  // Handle category quantity

  for (let i = 0; i < allCategory.length; i++) {
    const catItem = allCategory[i];
    const catQuantity = await courseModel.getQuantityByCategory(catItem.id);
    allCategory[i].catQuantity = catQuantity.length;
  }
  // Hanle course item
  for (let i = 0; i < courses.length; i++) {
    const catItem = await categoriesModel.single(courses[i].category);
    const userTeacher = await userModel.single(courses[i].authorId);
    if (userTeacher !== null) {
      courses[i].authorName =
        userTeacher.firstName + " " + userTeacher.lastName;
    }

    if (courses[i].courseName.length >= 60)
      courses[i].courseName = courses[i].courseName.slice(0, 60) + "...";

    courses[i].img = courseService.convertBlobToBase64(courses[i].courseImage);
    courses[i].catName = catItem.category_name;
  }
  res.render("vwCourses/courses", {
    categories: allCategory,
    courses: courses,
  });
});

router.get("/detail/:id", async (req, res) => {
  const courseID = req.params.id;

  // Course Item
  const courseItem = await courseModel.single(courseID);

  // Convert blob image to base64
  courseItem.imgSrc = courseService.convertBlobToBase64(courseItem.courseImage);

  //Get category
  const category = await categoriesModel.single(courseItem.category);

  // Teacher of course: is queried by authorId
  let userTeacher = await userModel.single(courseItem.authorId);
  if (userTeacher !== null) {
    courseItem.authorName = userTeacher.firstName + " " + userTeacher.lastName;
    userTeacher.userImage;
  }

  res.render("vwCourses/courseDetail", {
    courseItem: courseItem,
    userTeacher: userTeacher,
    category: category,
  });
});
module.exports = router;
