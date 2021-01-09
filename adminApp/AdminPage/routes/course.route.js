const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const courseModel = require('../models/course.model');
const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        res.render('vwCourse/index')
        // const rows = await courseModel.all();
        // res.render('vwCourse/index', {
        //   products: rows,
        //   empty: rows.length === 0
        // });
      } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
      }
})

router.get('/add', async function (req, res) {
    const rows = await categoryModel.all();
    res.render('vwCourse/add',{
      categories: rows
    });
})

module.exports = router;