const mysql = require("mysql");
const util = require("util");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "elearning",
  connectionLimit: 50,
});

const poolQuery = util.promisify(pool.query.bind(pool));
module.exports = { load: (sql) => poolQuery(sql) };