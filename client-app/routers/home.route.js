const express = require("express");
const categoriesModel = require("../models/categories.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/user.model");
const router = express.Router();
router.get("/", async (req, res) => {
  const allCategory = await categoriesModel.all();
  const tenLatestCourses = await courseModel.get10LatestCourses();
  const tenMostViewedCourses = await courseModel.get10MostViewedCourses();

  for (let i = 0; i < tenLatestCourses.length; i++) {
    const catItem = await categoriesModel.single(tenLatestCourses[i].category);

    const userTeacher = await userModel.single(tenLatestCourses[i].authorId);
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
    tenLatestCourses[i].catName = catItem.category_name;
  }

  // 10 Most Viewed
  for (let i = 0; i < tenMostViewedCourses.length; i++) {
    const catItem = await categoriesModel.single(
      tenMostViewedCourses[i].category
    );

    const userTeacher = await userModel.single(tenMostViewedCourses[i].authorId);
    if (userTeacher !== null) {
      tenMostViewedCourses[i].authorName =
        userTeacher.firstName + " " + userTeacher.lastName;
    }

    let base = Buffer.from(tenMostViewedCourses[i].courseImage);
    let conversion = base.toString("base64");
    if (tenMostViewedCourses[i].courseName.length >= 60)
      tenMostViewedCourses[i].courseName =
        tenMostViewedCourses[i].courseName.slice(0, 60) + "...";

    tenMostViewedCourses[i].img = conversion;
    tenMostViewedCourses[i].catName = catItem.category_name;
  }

  // Hanle view data category
  for (let i = 0; i < allCategory.length; i++) {
    let catItem = allCategory[i];
    if (catItem.category_des.length >= 100) {
      allCategory[i].category_des =
        allCategory[i].category_des.slice(0, 100) + "...";
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
