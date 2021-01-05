const categoryModel = require("../models/categories.model");
module.exports = function (app) {
  app.get("/", async (req, res) => {
    const allCategory = await categoryModel.all();
    // console.log(allCategory);
    res.render("home", {
      categories: allCategory,
    });
  });

  // Sign-up
  app.use("/", require("../routers/account.route"));
};
