const auth = require('../controllers/auth.controller');

const isAdmin = require('../controllers/admin.controller');
const courseModel = require('../models/course.model');
const subCategoryModel = require('../models/subCategory.model');
const userModel = require('../models/user.model');
const categoryModel = require('../models/category.model');

module.exports = function (app) {
    app.get('/', auth, async function (req, res) {
        req.session.retUrl = req.originalUrl
        courses = await courseModel.all('*')
        users = await userModel.all()
        categories = await categoryModel.all()
        subcategories = await subCategoryModel.all()
        res.render('home', {
            currentUser: req.session.authUser,
            numcourses: courses.length,
            numusers: users.length,
            numcategories: categories.length,
            numsubcategories: subcategories.length
        });
    });
    app.use('/user', require('../routes/user.route'));
    app.use('/course', auth, require('../routes/course.route'));
    app.use('/category', auth, isAdmin, require('../routes/category.route'));
};