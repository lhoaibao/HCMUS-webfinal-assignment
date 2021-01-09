const auth = require('../controllers/auth.controller');
module.exports = function (app) {
    app.get('/', auth, function (req, res) {
        res.render('home', {
            user: req.session.authUser
        });
    });
    app.use('/user',auth, require('../routes/user.route'));
    app.use('/course',auth, require('../routes/course.route'));
    app.use('/category',auth, require('../routes/category.route'));
};