const express = require("express");
const categoriesModel = require("../models/categories.model");
const subCategoriesModel = require("../models/subCategory.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const allSubCategory = await subCategoriesModel.all();
  const allCategory = await categoriesModel.all();
  const tenLatestCourses = await courseModel.get10LatestCourses();
  const tenMostViewedCourses = await courseModel.get10MostViewedCourses();

  // 10 latest courses
  for (let i = 0; i < tenLatestCourses.length; i++) {
    const catItem = await subCategoriesModel.single(
      tenLatestCourses[i].categoryId
    );

    const userTeacher = await userModel.single(tenLatestCourses[i].userId);
    if (userTeacher !== null) {
      tenLatestCourses[i].authorName =
        userTeacher.firstName + " " + userTeacher.lastName;
    }

    // Convert blob image to base64
    let base = Buffer.from(tenLatestCourses[i].courseImage);
    let conversion = base.toString("base64");

    if (tenLatestCourses[i].courseName.length >= 60)
      tenLatestCourses[i].courseName =
        tenLatestCourses[i].courseName.slice(0, 60) + "...";

    tenLatestCourses[i].img = conversion;
    tenLatestCourses[i].catName = catItem.subCategoryName;
  }

  // 10 most views courses
  for (let i = 0; i < tenMostViewedCourses.length; i++) {
    const catItem = await subCategoriesModel.single(
      tenMostViewedCourses[i].categoryId
    );

    const userTeacher = await userModel.single(tenMostViewedCourses[i].userId);
    if (userTeacher !== null) {
      tenMostViewedCourses[i].authorName =
        userTeacher.firstName + " " + userTeacher.lastName;
    }

    // Convert blob image to base64
    let base = Buffer.from(tenMostViewedCourses[i].courseImage);
    let conversion = base.toString("base64");

    if (tenMostViewedCourses[i].courseName.length >= 60)
      tenMostViewedCourses[i].courseName =
        tenMostViewedCourses[i].courseName.slice(0, 60) + "...";

    tenMostViewedCourses[i].img = conversion;
    tenMostViewedCourses[i].catName = catItem.subCategoryName;
  }

  // Hanle view data master category
  for (let i = 0; i < allCategory.length; i++) {
    let catItem = allCategory[i];
    if (catItem.categoryDesc.length >= 76) {
      allCategory[i].categoryDesc =
        allCategory[i].categoryDesc.slice(0, 76) + "...";
    }
  }
  res.render("home", {
    categories: allCategory,
    empty: allCategory.length === 0,
    latestCourses: tenLatestCourses,
    mostViewedCourses: tenMostViewedCourses,
  });
});

module.exports = router;
