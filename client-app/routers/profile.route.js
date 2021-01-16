const express = require("express");
const userModel = require("../models/user.model");
const router = express();
const courseService = require("../services/course");

const multer = require("multer");
const upload = multer({ dest: "resource/uploads/" });
const fs = require("fs");

const moment = require("moment");
const auth = require("../middlewares/auth");
router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;
  let user = await userModel.single(id);
  req.session.retUrl = req.originalUrl;

  let avatar = "";
  if (user.userImage !== null) {
    avatar = courseService.convertBlobToBase64(user.userImage);
  } else avatar = "images/user-avt.png";

  user.avatar = avatar;
  res.render("vwProfile/profile", {
    user: user,
  });
});

router.post("/edit/:id", upload.single("userImage"), async (req, res) => {
  let id = req.params.id;
  let entity = null;
  if (req.file) {
    image = fs.readFileSync("resource/uploads/" + req.file.filename);
    entity = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      userImage: image,
    };
  } else {
    entity = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
  }
  console.log(entity);
  await userModel.update(id, entity);
  res.redirect(req.session.retUrl);
});
module.exports = router;
