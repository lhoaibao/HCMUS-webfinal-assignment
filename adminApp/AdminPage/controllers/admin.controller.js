module.exports = function isAdmin(req, res, next) {
    if (req.session.authUser.permission !== 0) {
        return res.redirect(req.session.retUrl);
    }
    next();
}