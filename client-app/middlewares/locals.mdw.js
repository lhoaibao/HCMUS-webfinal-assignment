module.exports = function (app) {
  app.use(async (req, res, next) => {
    if (typeof req.session.isAuth === "undefined") {
      req.session.isAuth = false;
    }

    res.locals.isAuth = req.session.isAuth;
    res.locals.authUser = req.session.authUser;
    res.locals.avatar = req.session.avatar;
    res.locals.isTeacher = req.session.isTeacher;

    next();
  });
};
