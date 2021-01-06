const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const userModel = require("../models/user.model");

const router = express.Router();

// Sign-up
router.get("/sign-up", async function (req, res) {
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

router.get("/is-available", async function (req, res) {
  const username = req.query.user;
  const user = await userModel.singleByUsername(username);
  console.log(user);
  if (user === null) {
    return res.json(true);
  }

  return res.json(false);
});

// Sign in
router.get("/sign-in", async function (req, res) {
  res.render("vwAccount/signin", {
    layout: false,
  });
});

router.post("/sign-in", async function (req, res) {
  const { username, password } = req.body;
  const user = await userModel.singleByUsername(username);
  console.log(user);
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

  let url = "/";
  res.redirect(url);
});

module.exports = router;
