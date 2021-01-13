const express = require("express");
const categoriesModel = require("../models/categories.model");
const courseModel = require("../models/course.model");
const router = express.Router();
router.get("/", async (req, res) => {
  const allCategory = await categoriesModel.all();  
  const tenLatestCourses = await courseModel.get10LatestCourses();
  const tenMostViewedCourses = await courseModel.get10MostViewedCourses();

  for (let i = 0; i < tenLatestCourses.length; i++) {
    const catItem = await categoriesModel.single(tenLatestCourses[i].category);
    let base = Buffer.from(tenLatestCourses[i].courseImage);
    let conversion = base.toString("base64");
    if (tenLatestCourses[i].courseName.length >= 60)
      tenLatestCourses[i].courseName =
        tenLatestCourses[i].courseName.slice(0, 60) + "...";
    if (tenLatestCourses[i].authorName.length >= 20)
      tenLatestCourses[i].authorName =
        tenLatestCourses[i].authorName.slice(0, 20) + "...";
    tenLatestCourses[i].img = conversion;
    tenLatestCourses[i].catName = catItem.category_name;
  }

  for (let i = 0; i < tenMostViewedCourses.length; i++) {
    const catItem = await categoriesModel.single(
      tenMostViewedCourses[i].category
    );
    let base = Buffer.from(tenMostViewedCourses[i].courseImage);
    let conversion = base.toString("base64");
    if (tenMostViewedCourses[i].courseName.length >= 60)
      tenMostViewedCourses[i].courseName =
        tenMostViewedCourses[i].courseName.slice(0, 60) + "...";
    if (tenMostViewedCourses[i].authorName.length >= 20)
      tenMostViewedCourses[i].authorName =
        tenMostViewedCourses[i].authorName.slice(0, 20) + "...";
    tenMostViewedCourses[i].img = conversion;
    tenMostViewedCourses[i].catName = catItem.category_name;
  }

  //   handle view data category
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
