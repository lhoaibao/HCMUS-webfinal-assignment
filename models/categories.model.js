const db = require("../utils/db");

module.exports = {
  all: () => db.load("select * from categories"),
};
