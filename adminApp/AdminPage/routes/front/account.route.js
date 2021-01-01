const express = require('express');
const bcrypt = require('bcryptjs');

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
    res.render('vwAccount/login');
})

module.exports = router;