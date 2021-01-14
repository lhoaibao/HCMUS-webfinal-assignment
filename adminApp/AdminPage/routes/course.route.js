const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const fs = require("fs");
const multer = require('multer')
const upload = multer({ dest: 'resources/uploads/' })
const { v4: uuidv4 } = require('uuid');

const courseModel = require('../models/course.model');
const categoryModel = require('../models/category.model');
const userModel = require('../models/user.model');


const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const rows = await courseModel.all(`*, course.id as id`, `, category where category.id = course.categoryId`)
    req.session.retUrl = req.originalUrl
    res.render('vwCourse/index', {
      courses: rows,
      empty: rows.length === 0,
      currentUser: req.session.authUser
    });
  } catch (err) {
    console.error(err);
    res.send('View error log at server console.');
  }
})

router.get('/detail/:id', async function (req, res) {
  const row = await courseModel.single(req.params.id)
  const user = await userModel.single(row.authorId)
  const category = await categoryModel.single(row.categoryId)
  req.session.retUrl = req.originalUrl
  res.render('vwCourse/detail.hbs', {
    course: row,
    author: user,
    category_name: category.category_name,
    currentUser: req.session.authUser
  })
})

router.post('/detail/:id', async function (req, res) {
  entity = {
    status: req.body.status
  }
  await courseModel.update(req.params.id, entity);
  const row = await courseModel.single(req.params.id)
  const user = await userModel.single(row.authorId)
  res.render('vwCourse/detail.hbs', {
    course: row,
    author: user,
    currentUser: req.session.authUser
  })
})

router.get('/add', async function (req, res) {
  req.session.retUrl = req.originalUrl
  const rows = await categoryModel.all();
  res.render('vwCourse/add', {
    categories: rows,
    currentUser: req.session.authUser
  });
})

router.post('/add', upload.single('courseImage'), async function (req, res) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss')
  image = fs.readFileSync("resources/uploads/" + req.file.filename)
  entity = {
    id: uuidv4(),
    courseName: req.body.courseName,
    categoryId: req.body.categoryId,
    shortDesc: req.body.shortDesc,
    tuition: req.body.tuition,
    lastModify: now,
    detailDesc: req.body.detailDesc,
    authorId: req.session.authUser.id,
    courseImage: image,
  }
  fs.writeFileSync("resources/tmp/" + req.file.filename, image)
  await courseModel.add(entity);
  return res.render('vwCourse/add', {
    message: 'Add user success',
    currentUser: req.session.authUser
  })
})

router.get('/edit/:id', async function (req, res) {
  req.session.retUrl = req.originalUrl
  const row = await courseModel.single(req.params.id)
  const rows = await categoryModel.all();
  res.render('vwCourse/edit.hbs', {
    course: row,
    categories: rows,
    currentUser: req.session.authUser
  })
})

router.post('/edit/:id', upload.single('courseImage'), async function (req, res) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss')
  id = req.params.id
  if (req.file) {
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
  }
  else {
    entity = {
      courseName: req.body.courseName,
      category: req.body.category,
      shortDesc: req.body.shortDesc,
      tuition: req.body.tuition,
      lastModify: now,
      detailDesc: req.body.detailDesc,
      authorId: req.session.authUser.id,
    }
  }
  await courseModel.update(id, entity);
  return res.redirect('/course/detail/' + id)
})

router.post('/delete/:id', async function (req, res) {
  await courseModel.delete(req.params.id)
  return res.redirect(req.session.retUrl)
})


router.use('/detail/:id/lesson', require('./lesson.route'))
module.exports = router;