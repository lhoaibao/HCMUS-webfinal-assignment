const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
    const rows = await categoryModel.all()
    res.render('vwCategory/index', {
        categorys: rows
    });
})

router.get('/add', async function (req, res) {
    res.render('vwCategory/add');
})

router.post('/add', async function (req, res) {
    const category = await categoryModel.singleByUserName(req.body.category_name)
    if (category) {
        return res.render('vwCategory/add', {
            err_message: "Add fail!!! Category existed"
        });
    }
    entity = {
        category_name: req.body.category_name,
        category_des: req.body.category_des
    }
    await categoryModel.add(entity);
    return res.render('vwCategory/add', {
        message: 'Add category success'
    })
})

router.get('/detail/:id', async function (req, res) {
    const row = await categoryModel.single(req.params.id)
    res.render('vwCategory/detail.hbs', {
        category: row,
    })
})

router.get('/edit/:id', async function (req, res) {
    const row = await categoryModel.single(req.params.id)
    res.render('vwCategory/edit.hbs', {
        category: row,
    })
})

router.post('/edit/:id', async function (req, res) {
    id = req.params.id
    const row = await categoryModel.single(req.params.id)
    entity = {
        category_name: req.body.category_name,
        category_des: req.body.category_des
    }
    if (req.body.category_name === row.category_name) {
        return res.render('vwCategory/edit', {
            err_message: 'Update fail!!! Category existed',
            category: row,
        })
    }
    await categoryModel.update(id, entity);
    return res.redirect('/category/detail/' + id)
})

module.exports = router;