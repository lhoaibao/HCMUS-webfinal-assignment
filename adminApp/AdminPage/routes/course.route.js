const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const fs = require("fs");
var multer = require('multer')
var upload = multer({ dest: 'resources/uploads/' })

const courseModel = require('../models/course.model');
const categoryModel = require('../models/category.model');
const userModel = require('../models/user.model');


const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const rows = await courseModel.all()
    res.render('vwCourse/index', {
      courses: rows,
      empty: rows.length === 0
    });
  } catch (err) {
    console.error(err);
    res.send('View error log at server console.');
  }
})

router.get('/detail/:id', async function (req, res) {
  const row = await courseModel.single(req.params.id)
  const user = await userModel.single(row.authorId)
  console.log(row)
  res.render('vwCourse/detail.hbs', {
    course: row,
    author: user
  })
})

router.post('/detail/:id', async function (req, res) {
  entity = {
    status: req.body.status
  }
  await courseModel.update(req.params.id, entity);
  const row = await courseModel.single(req.params.id)
  const user = await userModel.single(row.authorId)
  console.log(row)
  res.render('vwCourse/detail.hbs', {
    course: row,
    author: user
  })
})

router.get('/add', async function (req, res) {
  const rows = await categoryModel.all();
  res.render('vwCourse/add', {
    categories: rows
  });
})

router.post('/add', upload.single('courseImage'), async function (req, res) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss')
  image = fs.readFileSync("resources/uploads/" + req.file.filename)
  entity = {
    courseName: req.body.courseName,
    category: req.body.category,
    shortDesc: req.body.shortDesc,
    tuition: req.body.tuition,
    lastModify: now,
    detailDesc: req.body.detailDesc,
    authorId: req.session.authUser.id,
    courseImage: image
  }
  fs.writeFileSync("resources/tmp/" + req.file.filename, image)
  await courseModel.add(entity);
  return res.render('vwCourse/add', {
    message: 'Add user success'
  })
})

module.exports = router;