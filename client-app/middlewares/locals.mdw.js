const categoryModel = require("../models/categories.model");

module.exports = function (app) {
  app.use(async (req, res, next) => {
    if (typeof req.session.isAuth === "undefined") {
      req.session.isAuth = false;
      req.session.cart = [];
    }

    res.locals.isAuth = req.session.isAuth;
    res.locals.authUser = req.session.authUser;
    res.locals.avatar = req.session.avatar;
    res.locals.isTeacher = req.session.isTeacher;
    const rows = await categoryModel.all();
    res.locals.categories = rows;
    next();
  });

  // app.use(async (req, res, next) => {
  //   const rows = await categoryModel.all();
  //   res.locals.categories = rows;
  //   next();
  // });
};
