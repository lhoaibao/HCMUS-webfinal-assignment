const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const auth = require('../controllers/auth.controller');
const isAdmin = require('../controllers/admin.controller');

const userModel = require('../models/user.model');

const router = express.Router();

router.get('/', auth, async function (req, res) {
    req.session.retUrl = req.originalUrl
    try {
        const rows = await userModel.all();
        res.render('vwUser/index', {
            users: rows,
            currentUser: req.session.authUser,
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})

router.get('/add', auth, isAdmin, async function (req, res) {
    req.session.retUrl = req.originalUrl
    res.render('vwUser/add', {
        currentUser: req.session.authUser
    });
})

router.post('/add', auth, isAdmin, async function (req, res) {
    const user = await userModel.singleByUserName(req.body.username)
    if (user) {
        return res.render('vwUser/add', {
            err_message: "User existed",
            currentUser: req.session.authUser
        });
    }
    entity = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        dob: req.body.dob,
        email: req.body.email,
        permission: 1
    }
    await userModel.add(entity);
    return res.render('vwUser/add', {
        message: 'Add user success',
        currentUser: req.session.authUser
    })
})

router.get('/login', async function (req, res) {
    if (req.headers.referer) {
        req.session.retUrl = req.headers.referer;
    }
    if (req.session.isAuth) {
        res.redirect(req.session.retUrl)
    }
    res.render('vwUser/login', {
        layout: false
    });
})

router.post('/login', async function (req, res) {
    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.render('vwUser/login', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
        return res.render('vwUser/login', {
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
    req.session.isAuth = false;
    req.session.authUser = null;
    req.session.cart = [];
    res.redirect(req.headers.referer);
})


router.get('/detail/:id', async function (req, res) {
    const row = await userModel.single(req.params.id)
    req.session.retUrl = req.originalUrl
    res.render('vwUser/detail.hbs', {
        user: row,
        currentUser: req.session.authUser
    })
})

router.get('/edit/:id', async function (req, res) {
    const row = await userModel.single(req.params.id)
    row.dob = moment(row.dob).format('YYYY-MM-DD');
    res.render('vwUser/edit.hbs', {
        user: row,
        currentUser: req.session.authUser
    })
})

router.post('/edit/:id', async function (req, res) {
    id = req.params.id
    const row = await userModel.single(req.params.id)
    if (row) {
        entity = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            dob: req.body.dob,
            email: req.body.email,
        }
        check = await userModel.update(id, entity);
        return res.redirect('/user/detail/' + id)
    }
    res.redirect(req.session.retUrl)
})

router.post('/delete/:id', async function (req, res) {
    id = req.params.id
    const check = await userModel.delete(id)
    if (check) {
        res.redirect('/user')
    }
    else {
        res.redirect(req.session.retUrl)
    }
})

module.exports = router;