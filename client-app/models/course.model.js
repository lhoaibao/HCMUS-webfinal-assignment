const db = require("../utils/db");

module.exports = {
  all: () => db.load("select * from course"),

  single: async (id) => {
    const rows = await db.load(`select * from course where id = ${id}`);
    if (rows.length == null) return null;
    return rows[0];
  },

  add: (entity) => db.add(entity, "course"),

  // Get 10 latest coures
  get10LatestCourses: () =>
    db.load("select * from course order by lastModify limit 10"),

  // Get 10 most viewed courses
  get10MostViewedCourses: () =>
    db.load("select * from course order by views limit 10"),

  // Get quantity by category
  getQuantityByCategory: async (id) => {
    const rows = await db.load(`select * from course where category = ${id}`);
    if (rows.length == null) return null;
    return rows;
  },
};
