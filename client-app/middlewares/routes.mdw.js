const auth = require("./auth");

module.exports = function (app) {
  //Homepage
  app.get("/", require("../routers/home.route"));

  // Account
  app.use("/account", require("../routers/account.route"));

  // Courses
  app.use("/courses", require("../routers/courses.route"));

  // Teacher
  app.use("/teachers", require("../routers/teachers.route"));

  //Profile
  app.use("/profile", require("../routers/profile.route"));
};
