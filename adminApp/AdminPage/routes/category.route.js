const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const categoryModel = require('../models/category.model');
const { route } = require('./lesson.route');

const router = express.Router();

router.get('/', async function (req, res) {
    const rows = await categoryModel.all()
    req.session.retUrl = req.originalUrl
    res.render('vwCategory/index', {
        categorys: rows,
        currentUser: req.session.authUser
    });
})

router.get('/add', async function (req, res) {
    res.render('vwCategory/add', {
        currentUser: req.session.authUser
    });
})

router.post('/add', async function (req, res) {
    const category = await categoryModel.singleBycategoryName(req.body.categoryName)
    if (category) {
        return res.render('vwCategory/add', {
            err_message: "Add fail!!! Category existed"
        });
    }
    entity = {
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc
    }
    await categoryModel.add(entity);
    return res.render('vwCategory/add', {
        message: 'Add category success',
        currentUser: req.session.authUser
    })
})

router.get('/detail/:id', async function (req, res) {
    const row = await categoryModel.single(req.params.id)
    req.session.retUrl = req.originalUrl
    res.render('vwCategory/detail.hbs', {
        category: row,
        currentUser: req.session.authUser
    })
})

router.get('/edit/:id', async function (req, res) {
    const row = await categoryModel.single(req.params.id)
    res.render('vwCategory/edit.hbs', {
        category: row,
        currentUser: req.session.authUser
    })
})

router.post('/edit/:id', async function (req, res) {
    id = req.params.id
    const row = await categoryModel.single(req.params.id)
    entity = {
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc
    }
    await categoryModel.update(id, entity);
    return res.redirect('/category/detail/' + id)
})

router.post('/delete/:id', async function (req, res) {
    id = req.params.id
    const check = await categoryModel.delete(id)
    if (check) {
        res.redirect('/category')
    }
    else {
        res.redirect(req.session.retUrl)
    }
})

module.exports = router;