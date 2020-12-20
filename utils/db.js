const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "elearning",
});

module.exports = {
  load(sql) {},
};
