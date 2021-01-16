const express = require("express");
const userModel = require("../models/user.model");
const router = express();
const courseService = require("../services/course");
const wishlistModel = require("../models/wishlist.model");
const multer = require("multer");
const upload = multer({ dest: "resource/uploads/" });
const fs = require("fs");
const courseModel = require("../models/course.model");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
// Learning
router.get("/learning", async (req, res) => {
  res.render("vwUser/learning", {});
});
// wishlist
router.get("/wishlist", async (req, res) => {
  const userId = req.session.authUser.id;
  req.session.retUrl = req.originalUrl
  res.render("vwUser/wishlist");
});

router.post("/wishlist/add/:id", async (req, res) => {
  const courseId = req.params.id;
  console.log(courseId)
  const entity = {
    id: uuidv4(),
    courseId: courseId,
    userId: req.session.authUser.id,
  };

  await wishlistModel.add(entity);
  res.redirect(req.session.retUrl);
});

router.post("/wishlist/delete/:id", async (req, res) => {
  const wishlistId = req.params.id;
  await wishlistModel.delete(wishlistId);
  res.redirect(req.session.retUrl);
});
// Profile
router.get("/profile", async (req, res) => {
  let id = req.session.authUser.id;
  let user = await userModel.single(id);
  req.session.retUrl = req.originalUrl;

  res.render("vwUser/profile");
});

router.post(
  "/profile/edit/:id",
  upload.single("userImage"),
  async (req, res) => {
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
    await userModel.update(id, entity);
    res.redirect(req.session.retUrl);
  }
);
module.exports = router;
