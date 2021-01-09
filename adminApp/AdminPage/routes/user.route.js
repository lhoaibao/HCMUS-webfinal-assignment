const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userModel = require('../models/user.model');

const router = express.Router();

router.get('/', async function (req, res) {
    res.render('vwUser/index');
})

router.get('/add', async function (req, res) {
    res.render('vwUser/add');
})

router.get('/login', async function (req, res) {
    if (req.session.isAuth) {
        res.redirect(req.session.retUrl)
    }
    if (req.headers.referer) {
        req.session.retUrl = req.headers.referer;
    }
    res.render('vwUser/login', {
        layout: false
    });
})

router.post('/login', async function (req, res) {
    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.render('vwAccount/login', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
        return res.render('vwAccount/login', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }

    req.session.isAuth = true;
    req.session.authUser = user;

    let url = req.session.retUrl || '/';
    res.redirect(url);
})

router.post('/logout', async function (req, res) {
    console.log(req.headers.referer)
    req.session.isAuth = false;
    req.session.authUser = null;
    req.session.cart = [];
    res.redirect(req.headers.referer);
})

module.exports = router;