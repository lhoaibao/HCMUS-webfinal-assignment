const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "elearning",
});

const app = express();
app.use(express.static(__dirname + "/public"));

app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  db.connect();

  db.query("select * from users", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });

  db.end();
  res.render("home");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});
