const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const auth = require('../controllers/auth.controller');
const isAdmin = require('../controllers/admin.controller');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const upload = multer({ dest: 'resources/uploads/' })
const fs = require('fs')

const userModel = require('../models/user.model');

const router = express.Router();

router.get('/', auth, async function (req, res) {
    req.session.retUrl = req.originalUrl
    try {
        const teachers = await userModel.all(`where permission='teacher'`);
        const students = await userModel.all(`where permission='student'`);
        res.render('vwUser/index', {
            teachers: teachers,
            students: students,
            currentUser: req.session.authUser,
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})

router.get('/add', auth, async function (req, res) {
    req.session.retUrl = req.originalUrl
    res.render('vwUser/add', {
        currentUser: req.session.authUser
    });
})

router.post('/add', upload.single('userImage'), auth, async function (req, res) {
    const user = await userModel.singleByUserName(req.body.username)
    if (user) {
        return res.render('vwUser/add', {
            err_message: "User existed",
            currentUser: req.session.authUser
        });
    }
    if (req.file) userImage = fs.readFileSync("resources/uploads/" + req.file.filename)
    else userImage = null
    entity = {
        id: uuidv4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        dob: req.body.dob,
        email: req.body.email,
        permission: req.body.permission,
        userImage: userImage,
        profile: req.body.profile,
        phoneNumber: req.body.phoneNumber
    }
    await userModel.add(entity);
    return res.render('vwUser/add', {
        message: 'Add user success',
        currentUser: req.session.authUser
    })
})

router.post('/login', async function (req, res) {
    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.render('vwUser/login', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    } else if (user.status == 'deactivate' || user.permission == 'student') {
        return res.render('vwUser/login', {
            layout: false,
            err_message: 'This user is blocked by admin or do not permission on this site. Please contact for more information'
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
    res.redirect(req.headers.referer);
})

router.get('/profile', auth, async function (req, res) {
    req.session.retUrl = req.originalUrl
    try {
        res.render('vwUser/profile', {
            currentUser: req.session.authUser,
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})

router.get('/changePassword', auth, async function (req, res) {
    try {
        res.render('vwUser/changePassword', {
            currentUser: req.session.authUser,
        });
    } catch (err) {
        console.error(err);
        res.send('View error log at server console.');
    }
})

router.post('/changePassword', auth, async function (req, res) {
    const ret = bcrypt.compareSync(req.body['old-password'], req.session.authUser.password);
    if (ret) {
        if (req.body['new-password'] != req.body['confirm-new-password']) {
            return res.render('vwUser/changePassword', {
                currentUser: req.session.authUser,
                err_message: "Confirm password does not match"
            });
        } else {
            entity = {
                password: bcrypt.hashSync(req.body['new-password'], 10),
            }
            await userModel.update(req.session.authUser.id, entity);
            req.session.authUser = userModel.single(req.session.authUser.id)
            return res.redirect(req.session.retUrl)
        }
    }
    return res.render('vwUser/changePassword', {
        currentUser: req.session.authUser,
        err_message: "Old password is wrong"
    });
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

router.get('/detail/:id', auth, async function (req, res) {
    const row = await userModel.single(req.params.id)
    res.render('vwUser/detail.hbs', {
        user: row,
        currentUser: req.session.authUser
    })
})

router.get('/edit/:id', auth, async function (req, res) {
    res.render('vwUser/edit.hbs', {
        currentUser: req.session.authUser
    })
})

router.post('/edit/:id', upload.single('userImage'), auth, async function (req, res) {
    let id = req.params.id
    if (req.file) {
        userImage = fs.readFileSync("resources/uploads/" + req.file.filename)
        entity = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            email: req.body.email,
            userImage: userImage,
            profile: req.body.profile,
            phoneNumber: req.body.phoneNumber
        }
    }
    else {
        entity = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            email: req.body.email,
            profile: req.body.profile,
            phoneNumber: req.body.phoneNumber
        }
    }
    await userModel.update(id, entity);
    req.session.authUser = await userModel.single(id)
    return res.redirect(req.session.retUrl)
})

router.post('/delete/:id', auth, async function (req, res) {
    id = req.params.id
    const check = await userModel.delete(id)
    if (check) {
        return res.redirect('/user')
    }
    return res.redirect(req.session.retUrl)
})

router.post('/status/:id', auth, async function (req, res) {
    id = req.params.id
    const row = await userModel.single(req.params.id)
    entity = {
        status: row.status == 'active' ? 'deactivate' : 'active'
    }
    const check = await userModel.update(id, entity)
    return res.redirect(req.session.retUrl)
})

module.exports = router;