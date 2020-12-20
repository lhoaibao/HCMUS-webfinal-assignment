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

/* Notes: we have 3 ways to handle asynchronous in javascript
      Method 1: using callback function
      Method 2: using promise
      Method 3: using async/await
*/

/*Method 1: callback function
 load(sql, func) {
   connection.connect();
   connection.query(sql, function (error, result, field) {
     if (error) throw error;
     func(result);
     connection.end();
   });
 },
*/

/*Method 2: using Promise
 load(sql) {
   return new Promise(function (done, fail) {
     pool.query(sql, function (error, result, field) {
       if (error) fail(error);
       else done(result);
     });
   });
 }
 */
