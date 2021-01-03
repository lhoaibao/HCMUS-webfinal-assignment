const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userModel = require('../../models/user.model');

const router = express.Router();

router.get('/login', async function (req, res) {
    if (req.headers.referer) {
        req.session.retUrl = req.headers.referer;
    }

    res.render('vwAccount/login', {
        layout: false
    });
})

router.post('/login', async function (req, res) {
    console.log(req)
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