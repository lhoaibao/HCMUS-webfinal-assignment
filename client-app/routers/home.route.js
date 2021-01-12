const express = require("express");
const categoriesModel = require("../models/categories.model");
const courseModel = require("../models/course.model");

const router = express.Router();
router.get("/", async (req, res) => {
  const allCategory = await categoriesModel.all();
  const tenLatestCourses = await courseModel.get10LatestCourses();
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

  res.render("home", {
    categories: allCategory,
    empty: allCategory.length === 0,
    latestCourses: tenLatestCourses,
  });
});

module.exports = router;
