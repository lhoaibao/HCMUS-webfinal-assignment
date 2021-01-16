module.exports = function isTeacher(req, res, next) {
    if (req.session.authUser.permission !== 'teacher') {
        return res.redirect(req.session.retUrl);
    }
    next();
}