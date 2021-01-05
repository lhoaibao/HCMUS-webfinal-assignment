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
module.exports = {
  load: (sql) => poolQuery(sql),
  add: (entity, tableName) =>
    poolQuery(`insert into ${tableName} set ?`, entity),
  del: (condition, tableName) =>
    poolQuery(`delete from ${tableName} where ?`, condition),
  patch: (entity, condition, tableName) =>
    poolQuery(`update ${tableName} set ? where ?`, [entity, condition]),
};
