const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/user.model");

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
  console.log(dob);
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
  res.render("home");
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

  req.session.isAuth = true;
  req.session.authUser = user;
  let url = req.session.retUrl || "/";
  res.redirect(url);
});

// Log out
router.post("/log-out", (req, res) => {
  req.session.isAuth = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
});
module.exports = router;
