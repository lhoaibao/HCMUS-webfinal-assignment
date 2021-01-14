const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/user.model");
const courseService = require("../services/course");
const router = express.Router();

// Register
router.get("/sign-up", async function (req, res) {
  if (req.session.isAuth) {
    return res.redirect(req.session.retUrl);
  }
  res.render("vwAccount/signup");
});

router.post("/sign-up", async function (req, res) {
  //Hash password
  let { username, firstName, lastName, email, type, dob, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  dob = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD");
  const user = {
    userID: uuidv4(),
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    dob: dob,
    permission: +type,
  };

  await userModel.add(user);
  res.redirect("/");
});

// Check user đã tồn tại hay chưa?
router.get("/is-available", async function (req, res) {
  const username = req.query.user;
  const user = await userModel.singleByUsername(username);
  if (user === null) {
    return res.json(true);
  }

  return res.json(false);
});

// Log in
router.get("/sign-in", async function (req, res) {
  const ref = req.headers.referer;
  if (req.session.isAuth) {
    return res.redirect(req.session.retUrl);
  }

  if (req.headers.referer) {
    req.session.retUrl = ref;
  }

  res.render("vwAccount/signin");
});

router.post("/sign-in", async function (req, res) {
  const { username, password } = req.body;
  const user = await userModel.singleByUsername(username);
  // Check username
  if (user === null) {
    return res.render("vwAccount/signin", {
      error_message: "Invalid username or password!",
    });
  }

  //Check password
  if (bcrypt.compareSync(password, user.password) === false) {
    return res.render("vwAccount/signin", {
      error_message: "Password does not match!!!",
    });
  }

  // Conert user avatar
  let avatar = "";
  if (user.userImage !== null) {
    avatar = courseService.convertBlobToBase64(user.userImage);
  } else avatar = "images/user-avt.png";

  // Type user
  const isTeacher = user.permission === 1;
  console.log(isTeacher);
  req.session.isAuth = true;
  req.session.authUser = user;
  req.session.avatar = avatar;
  req.session.isTeacher = isTeacher;
  let url = req.session.retUrl || "/";
  res.redirect(url);
});

// Log out
router.post("/log-out", (req, res) => {
  req.session.isAuth = false;
  req.session.authUser = null;
  req.session.avatar = null;
  req.session.isTeacher = null;
  res.redirect(req.headers.referer);
});
module.exports = router;
