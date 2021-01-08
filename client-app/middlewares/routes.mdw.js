const categoryModel = require("../models/categories.model");
module.exports = function (app) {
  app.get("/", async (req, res) => {
    const allCategory = await categoryModel.all();
    res.render("home", {
      categories: allCategory,
    });
  });

  // Account
  app.use("/account", require("../routers/account.route"));
};
