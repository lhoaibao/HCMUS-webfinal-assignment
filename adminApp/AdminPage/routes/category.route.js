const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
    const rows = await categoryModel.all()
    res.render('vwCategory/index',{
        categorys: rows
    });
})

router.get('/add', async function (req, res) {
    res.render('vwCategory/add');
})

router.post('/add', async function (req, res) {
    const category = await categoryModel.singleByUserName(req.body.name)
    if (category){
        return res.render('vwCategory/add', {
            err_message: "Category existed"
        });
    }
    entity = {
        name: req.body.name
    }
    await categoryModel.add(entity);
    return res.render('vwCategory/add', {
        message: 'Add user success'
    })
})

module.exports = router;