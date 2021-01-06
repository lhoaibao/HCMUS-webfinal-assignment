const { default: ColumnGroup } = require("antd/lib/table/ColumnGroup");
const categoryModel = require("../models/categories.model");
module.exports = function (app) {
  app.get("/", async (req, res) => {
    console.log(req.session);
    const allCategory = await categoryModel.all();
    res.render("home", {
      categories: allCategory,
    });
  });

  // Sign-up
  app.use("/account", require("../routers/account.route"));
};
