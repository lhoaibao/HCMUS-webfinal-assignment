// Import module
const express = require("express");
const exphbs = require("express-handlebars");
const routing = require("./routing");
const path = require("path");
const app = express();

// Static file setup
app.use(express.static(path.join(__dirname, "/public")));

// view engine setup
app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "layout.hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use("/", routing);

// Default root
app.use((req, res) => {
  res.render("404", {
    layout: false,
  });
});

// Handle Error
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).render("500", {
    layout: false,
  });
});

// App is listening at PORT 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});
