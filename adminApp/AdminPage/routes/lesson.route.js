const express = require('express');

const router = express.Router();

router.get('/', async function (req, res) {
    res.render('./vwLesson/index')
})

router.get('/add', async function (req, res) {
    res.render('./vwLesson/add')
})

module.exports = router; 