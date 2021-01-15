const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");

module.exports = function (app) {
  app.engine(
    "hbs",
    exphbs({
      defaultLayout: "main.hbs",
      extname: "hbs",
      layoutsDir: "views/layouts",
      partialsDir: "views/partials",
      helpers: {
        section: hbs_sections(),
      },
    })
  );
  app.set("view engine", "hbs");
  let hbsInstance = exphbs.create({});
  hbsInstance.handlebars.registerHelper(
    "ifCond",
    function (v1, operator, v2, options) {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!=":
          return v1 != v2 ? options.fn(this) : options.inverse(this);
        case "!==":
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case "&&":
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case "||":
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    }
  );
};
