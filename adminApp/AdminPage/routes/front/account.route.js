const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/register', async function (req, res) {
    res.render('vwAccount/register');
})

router.get('/login', async function (req, res) {
    res.render('vwAccount/login');
})

module.exports = router;