module.exports = function isAdmin(req, res, next) {
    if (req.session.authUser.permission !== 'admin') {
        return res.redirect(req.session.retUrl);
    }
    next();
}