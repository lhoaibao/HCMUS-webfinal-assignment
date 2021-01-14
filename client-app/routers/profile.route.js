const express = require("express");
const userModel = require("../models/user.model");
const router = express();
const courseService = require("../services/course");
const moment = require("moment");
const auth = require("../middlewares/auth");
router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;
  let user = await userModel.single(id);

  let avatar = "";
  if (user.userImage !== null) {
    avatar = courseService.convertBlobToBase64(user.userImage);
  } else avatar = "images/user-avt.png";

  user.avatar = avatar;
  let dobDate = new Date(user.dob);
  res.render("vwProfile/profile", {
    user: user,
    dob: dobDate.toDateString(),
  });
});

module.exports = router;
