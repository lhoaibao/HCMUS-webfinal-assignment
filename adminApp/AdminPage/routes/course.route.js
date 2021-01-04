const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userModel = require('../models/user.model');

const router = express.Router();

router.get('/', async function (req, res) {
    res.render('vwCourse/index');
})

router.get('/add-course', async function (req, res) {
    res.render('vwCourse/add-course');
})

module.exports = router;