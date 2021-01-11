const auth = require('../controllers/auth.controller');
const isAdmin = require('../controllers/admin.controller');

module.exports = function (app) {
    app.get('/', auth, function (req, res) {
        res.render('home', {
            currentUser: req.session.authUser
        });
    });
    app.use('/user', require('../routes/user.route'));
    app.use('/course', auth, require('../routes/course.route'));
    app.use('/category', auth, isAdmin, require('../routes/category.route'));
};