const express = require("express");
const subCategoryModel = require("../models/subCategory.model");
const categoriesModel = require("../models/categories.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/user.model");
const courseService = require("../services/course");
const router = express.Router();

router.get("/", async (req, res) => {
  const allCategory = await categoriesModel.all();
  const courses = await courseModel.all();
  // Handle sub Category quantity
  const catQuantity = await categoriesModel.getQuantityOfSubCategory();
  for (let i = 0; i < allCategory.length; i++) {
    allCategory[i].subCatQuantity = catQuantity[i].subCatQuantity;
  }

  // Hanle course item
  for (let i = 0; i < courses.length; i++) {
    const catItem = await subCategoryModel.single(courses[i].categoryId);

    const userTeacher = await userModel.single(courses[i].userId);

    if (userTeacher !== null) {
      courses[i].authorName =
        userTeacher.firstName + " " + userTeacher.lastName;
    }

    if (courses[i].courseName.length >= 60)
      courses[i].courseName = courses[i].courseName.slice(0, 60) + "...";

    courses[i].img = courseService.convertBlobToBase64(courses[i].courseImage);
    if (catItem !== undefined) courses[i].catName = catItem.subCategoryName;
  }
  // console.log(courses);
  res.render("vwCourses/courses", {
    categories: allCategory,
    allCourse: courses,
  });
});

router.get("/detail/:id", async (req, res) => {
  const courseID = req.params.id;
  console.log(courseID);
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
