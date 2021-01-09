const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userModel = require('../models/course.model');

const router = express.Router();

router.get('/', async function (req, res) {
    res.render('vwCategory/index');
})

router.get('/add', async function (req, res) {
    res.render('vwCategory/add');
})

module.exports = router;