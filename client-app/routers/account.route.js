const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const userModel = require("../models/user.model");

const router = express.Router();

// Register
router.get("/sign-up", async function (req, res) {
  if (req.session.isAuth) {
    return res.redirect(req.session.retUrl);
  }
  res.render("vwAccount/signup", {
    layout: false,
  });
});

router.post("/sign-up", async function (req, res) {
  //Hash password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const { username, firstName, lastName, email, password, dob } = req.body;
  const user = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    dob: dob,
    permission: 2,
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
  res.render("vwAccount/signin", {
    layout: false,
  });
});

router.post("/sign-in", async function (req, res) {
  const { username, password } = req.body;
  const user = await userModel.singleByUsername(username);
  // Check username
  if (user === null) {
    return res.render("vwAccount/signin", {
      layout: false,
      error_message: "Invalid username or password!",
    });
  }

  //Check password
  if (bcrypt.compareSync(password, user.password) === false) {
    return res.render("vwAccount/signin", {
      layout: false,
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
