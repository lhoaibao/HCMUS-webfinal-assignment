const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userModel = require('../../models/user.model');

const router = express.Router();

router.get('/register', async function (req, res) {
    res.render('vwAccount/register');
})

router.post('/register', async function (req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const user = {
        username: req.body.username,
        password: hash,
        dob: dob,
        name: req.body.name,
        email: req.body.email,
        permission: 0
    }

    await userModel.add(user);
    res.render('vwAccount/register');
})

router.get('/login', async function (req, res) {
    if (req.headers.referer) {
        req.session.retUrl = req.headers.referer;
    }

    res.render('vwAccount/login', {
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
    // req.session.cart = [];

    let url = req.session.retUrl || '/';
    res.redirect(url);
})

router.post('/logout', async function (req, res) {
    req.session.isAuth = false;
    req.session.authUser = null;
    req.session.cart = [];
    res.redirect(req.headers.referer);
})

module.exports = router;