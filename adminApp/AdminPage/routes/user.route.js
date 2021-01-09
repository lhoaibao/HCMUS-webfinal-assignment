const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const auth = require('../controllers/auth.controller');

const userModel = require('../models/user.model');

const router = express.Router();

router.get('/', auth, async function (req, res) {
    try {
        const rows = await userModel.all();
        res.render('vwUser/index', {
            users: rows,
            isAdmin: req.session.authUser.permission === 0,
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})

router.get('/add', auth, async function (req, res) {
    res.render('vwUser/add');
})

router.post('/add', auth, async function (req, res) {
    const user = await userModel.singleByUserName(req.body.username)
    if (user) {
        return res.render('vwUser/add', {
            err_message: "User existed"
        });
    }
    entity = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        dob: req.body.dob,
        email: req.body.email,
        permission: parseInt(req.body.permission)
    }
    await userModel.add(entity);
    return res.render('vwUser/add', {
        message: 'Add user success'
    })
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