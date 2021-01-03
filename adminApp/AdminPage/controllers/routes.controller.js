const auth = require('../controllers/auth.controller');
module.exports = function (app) {
    app.get('/', auth, function (req, res) {
        console.log(req.headers);
        res.render('home', {
            user: req.session.authUser
        });
    });
    app.use('/account', require('../routes/account.route'));
    app.use('/course', require('../routes/course.route'));
};