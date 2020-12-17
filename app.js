const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
app.use(express.static(__dirname + "/public"));

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});
