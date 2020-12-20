const express = require("express");
const mysql = require("mysql");
const router = express.Router();

router.get("/", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "elearning",
  });

  connection.connect();
  const sql = "select * from categories";

  // Query là hàm bất đồng bộ
  connection.query(sql, (errors, results, field) => {
    if (errors) throw errors;
    const categoryList = results;
    res.render("vwCategories/index", {
      categories: categoryList,
      empty: categoryList.length === 0,
    });
    connection.end();
  });
});

module.exports = router;
