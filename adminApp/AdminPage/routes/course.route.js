const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const fs = require("fs");
const multer = require('multer')
const upload = multer({ dest: 'resources/uploads/' })
const { v4: uuidv4 } = require('uuid');
const isTeacher = require('../controllers/teacher.controller');
const courseModel = require('../models/course.model');
const subCategoryModel = require('../models/subCategory.model');
const userModel = require('../models/user.model');
const discountModel = require('../models/discount.model');


const router = express.Router();

router.get('/', async function (req, res) {
  try {
    let rows
    if (req.session.authUser.permission == 'teacher') {
      rows = await courseModel.all(`*, course.id as id`, `, subcategory, user where subcategory.id = course.categoryId and user.id=course.userId and course.userId='${req.session.authUser.id}'`)
    } else {
      rows = await courseModel.all(`*, course.id as id`, `, subcategory, user where subcategory.id = course.categoryId and user.id=course.userId`)
    }
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
  const user = await userModel.single(row.userId)
  const category = await subCategoryModel.single(row.categoryId)
  req.session.retUrl = req.originalUrl
  res.render('vwCourse/detail.hbs', {
    course: row,
    author: user,
    categoryName: category.subCategoryName,
    currentUser: req.session.authUser
  })
})

router.post('/detail/:id', async function (req, res) {
  entity = {
    isCompleted: req.body.isCompleted
  }
  await courseModel.update(req.params.id, entity);
  const row = await courseModel.single(req.params.id)
  const user = await userModel.single(row.userId)
  res.render('vwCourse/detail.hbs', {
    course: row,
    author: user,
    currentUser: req.session.authUser
  })
})

router.get('/add', async function (req, res) {
  req.session.retUrl = req.originalUrl
  const rows = await subCategoryModel.all();
  const discounts = await discountModel.all();
  res.render('vwCourse/add', {
    categories: rows,
    discounts: discounts,
    currentUser: req.session.authUser
  });
})

router.post('/add', upload.single('courseImage'), async function (req, res) {
  var now = moment().format('YYYY-MM-DD hh:mm:ss')
  image = fs.readFileSync("resources/uploads/" + req.file.filename)
  const rows = await subCategoryModel.all();
  const discounts = await discountModel.all();
  entity = {
    id: uuidv4(),
    courseName: req.body.courseName,
    categoryId: req.body.categoryId,
    shortDesc: req.body.shortDesc,
    tuition: req.body.tuition,
    modifyAt: now,
    createAt: now,
    detailDesc: req.body.detailDesc,
    userId: req.session.authUser.id,
    discountId: req.body.discountId,
    courseImage: image,
  }
  await courseModel.add(entity);
  return res.render('vwCourse/add', {
    message: 'Add course success',
    categories: rows,
    discounts: discounts,
    currentUser: req.session.authUser
  })
})

router.post('/status/:id', async function (req, res) {
  id = req.params.id
  const row = await courseModel.single(req.params.id)
  entity = {
    status: row.status == 'active' ? 'deactivate' : 'active'
  }
  const check = await courseModel.update(id, entity)
  return res.redirect(req.session.retUrl)
})

router.post('/delete/:id', async function (req, res) {
  id = req.params.id
  const check = await courseModel.delete(id)
  if (check) {
    return res.redirect('/course')
  }
  return res.redirect(req.session.retUrl)
})

router.get('/edit/:id', async function (req, res) {
  req.session.retUrl = req.originalUrl
  const row = await courseModel.single(req.params.id)
  const rows = await subCategoryModel.all();
  const discounts = await discountModel.all();
  res.render('vwCourse/edit.hbs', {
    course: row,
    categories: rows,
    discounts: discounts,
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
      categoryId: req.body.categoryId,
      shortDesc: req.body.shortDesc,
      tuition: req.body.tuition,
      modifyAt: now,
      detailDesc: req.body.detailDesc,
      userId: req.session.authUser.id,
      courseImage: image
    }
    fs.writeFileSync("resources/tmp/" + req.file.filename, image)
  }
  else {
    entity = {
      courseName: req.body.courseName,
      categoryId: req.body.categoryId,
      shortDesc: req.body.shortDesc,
      tuition: req.body.tuition,
      modifyAt: now,
      detailDesc: req.body.detailDesc,
      userId: req.session.authUser.id,
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