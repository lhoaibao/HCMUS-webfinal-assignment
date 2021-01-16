const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const categoryModel = require('../models/category.model');
const subCategoryModel = require('../models/subCategory.model');
const { route } = require('./lesson.route');

const router = express.Router();

router.get('/', async function (req, res) {
    const rows = await categoryModel.all()
    const rows1 = await subCategoryModel.all()
    req.session.retUrl = req.originalUrl
    res.render('vwCategory/index', {
        categories: rows,
        subCategories: rows1,
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
        id: uuidv4(),
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc
    }
    await categoryModel.add(entity);
    return res.render('vwCategory/add', {
        message: 'Add category success',
        currentUser: req.session.authUser
    })
})

router.get('/addSub', async function (req, res) {
    const categories = await categoryModel.all()
    res.render('vwCategory/addSub', {
        categories: categories,
        currentUser: req.session.authUser
    });
})

router.post('/addSub', async function (req, res) {
    entity = {
        id: uuidv4(),
        subCategoryName: req.body.subCategoryName,
        subCategoryDesc: req.body.subCategoryDesc,
        categoryId: req.body.categoryId
    }
    await subCategoryModel.add(entity);
    return res.render('vwCategory/addSub', {
        message: 'Add category success',
        currentUser: req.session.authUser
    })
})

router.get('/editCategory/:id', async function (req, res) {
    const row = await categoryModel.single(req.params.id)
    res.render('vwCategory/edit.hbs', {
        category: row,
        currentUser: req.session.authUser
    })
})

router.post('/editCategory/:id', async function (req, res) {
    id = req.params.id
    const row = await categoryModel.single(req.params.id)
    entity = {
        categoryName: req.body.categoryName,
        categoryDesc: req.body.categoryDesc
    }
    await categoryModel.update(id, entity);
    return res.redirect('/category')
})

router.get('/editSubCategory/:id', async function (req, res) {
    const row = await subCategoryModel.single(req.params.id)
    const categories = await categoryModel.all()
    res.render('vwCategory/editSub.hbs', {
        subCategory: row,
        categories: categories,
        currentUser: req.session.authUser
    })
})

router.post('/editSubCategory/:id', async function (req, res) {
    id = req.params.id
    entity = {
        subCategoryName: req.body.subCategoryName,
        subCategoryDesc: req.body.subCategoryDesc
    }
    await subCategoryModel.update(id, entity);
    return res.redirect('/category')
})


router.post('/deleteSubCategory/:id', async function (req, res) {
    id = req.params.id
    const check = await subCategoryModel.delete(id)
    if (check) {
        res.status(200).send(true)
    }
    else {
        res.status(400).send(false)
    }
})

router.post('/deleteCategory/:id', async function (req, res) {
    id = req.params.id
    try {
        const check = await categoryModel.delete(id)
        if (check) {
            res.status(200).send(true)
        }
        else {
            res.status(400).send(false)
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;