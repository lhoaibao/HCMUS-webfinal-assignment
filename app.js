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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});
