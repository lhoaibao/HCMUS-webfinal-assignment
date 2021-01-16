const express = require("express");
const router = express.Router();
const subCategoryModel = require("../models/subCategory.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/user.model");
const courseServices = require("../services/course");
router.get("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const sortBy = req.query.sortBy;
  req.session.retUrl = req.originalUrl;
  let subCategories = await subCategoryModel.subCategoriesByCategory(
    categoryId
  );
  let courses = [];

  // Get all courses by subCategory
  for (let i = 0; i < subCategories.length; i++) {
    // Get quantity of subcategory
    let subCatQuantity = await courseModel.getQuantityByCategory(
      subCategories[i].id
    );

    subCategories[i].subCategoryQuantity = subCatQuantity.catQuantity;

    // Get courses by subcategory
    let courseBySubCategory = await courseModel.getCourseBySubCategory(
      subCategories[i].id
    );
    courses = [...courses, ...courseBySubCategory];
  }
  
  // Sortby type
  switch (+sortBy) {
    // All
    case 1:
      break;
    // A to Z
    case 2:
      courses.sort((a, b) => a.courseName.localeCompare(b.courseName));
      break;
    // Z to A
    case 3:
      courses.sort((a, b) => b.courseName.localeCompare(a.courseName));
      break;
    // 10 Latest courses
    case 4:
      courses.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
      courses = courses.slice(0, 10);
      break;

    // 10 most viewed courses
    case 5:
      courses.sort((a, b) => b.views - a.views);
      courses = courses.slice(0, 10);
      break;
  }

  // Hanle course item
  for (let i = 0; i < courses.length; i++) {
    const catItem = await subCategoryModel.single(courses[i].categoryId);
    const userTeacher = await userModel.single(courses[i].userId);
    console.log(courses[i].createAt);
    if (userTeacher !== null) {
      courses[i].authorName =
        userTeacher.firstName + " " + userTeacher.lastName;
    }

    if (courses[i].courseName.length >= 60)
      courses[i].courseName = courses[i].courseName.slice(0, 60) + "...";

    courses[i].img = courseServices.convertBlobToBase64(courses[i].courseImage);
    if (catItem !== undefined) courses[i].catName = catItem.subCategoryName;
  }
  // Render
  res.render("vwCategories/categories", {
    categories: subCategories,
    allCourse: courses,
    emptyCategories: subCategories.length === 0,
    emptyCourses: courses.length === 0,
  });
});

module.exports = router;
