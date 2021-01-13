const express = require("express");
const userModel = require("../models/user.model");
const router = express();

router.get("/", async (req, res) => {
  const teachers = await userModel.getByType(1);
  for (let i = 0; i < teachers.length; i++) {
    let base = Buffer.from(teachers[i].userImage);
    let conversion = base.toString("base64");
    teachers[i].imgSrc = conversion;
  }
  res.render("vwTeachers/teachers", {
    teachers: teachers,
  });
});

module.exports = router;
