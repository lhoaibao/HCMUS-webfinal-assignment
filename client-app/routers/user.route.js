const express = require("express");
const userModel = require("../models/user.model");
const router = express();
const courseServices = require("../services/course");
const wishlistModel = require("../models/wishlist.model");
const subCategoryModel = require("../models/subCategory.model");
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
  const wishlist = await wishlistModel.all();
  let courseList = [];
  if (wishlist.length !== 0) {
    for (let i = 0; i < wishlist.length; i++) {
      let courseItem = await courseModel.single(wishlist[i].courseId);
      courseList = [...courseList, courseItem];
    }

    // Hanle course item
    for (let i = 0; i < courseList.length; i++) {
      const catItem = await subCategoryModel.single(courseList[i].categoryId);
      const userTeacher = await userModel.single(courseList[i].userId);
      if (userTeacher !== null) {
        courseList[i].authorName =
          userTeacher.firstName + " " + userTeacher.lastName;
      }

      if (courseList[i].courseName.length >= 60)
        courseList[i].courseName =
          courseList[i].courseName.slice(0, 60) + "...";

      courseList[i].img = courseServices.convertBlobToBase64(
        courseList[i].courseImage
      );
      courseList[i].wishlistId = wishlist[i].id;
      if (catItem !== undefined)
        courseList[i].catName = catItem.subCategoryName;
    }
  }

  req.session.retUrl = req.originalUrl;
  res.render("vwUser/wishlist", {
    wishlist: courseList,
  });
});

router.post("/wishlist/add/:id", async (req, res) => {
  const courseId = req.params.id;
  const userId = req.session.authUser.id;
  let wishlist = await wishlistModel.all();
  let isExistWishlist = false;
  if (wishlist.length !== 0) {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].courseId === courseId && wishlist[i].userId === userId) {
        isExistWishlist = true;
        break;
      }
    }
  }

  if (isExistWishlist) {
    return res.redirect(req.session.retUrl);
  }

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
  console.log(wishlistId);
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
