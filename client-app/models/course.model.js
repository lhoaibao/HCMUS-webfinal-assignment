const db = require("../utils/db");

const TBL_COURSE = "course";
module.exports = {
  all: () => db.load(`select * from ${TBL_COURSE}`),

  single: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_COURSE} where courseID = '${id}'`
    );
    if (rows.length === null) return null;
    return rows[0];
  },

  add: (entity) => db.add(entity, TBL_COURSE),

  // Get 10 latest coures
  get10LatestCourses: () =>
    db.load(`select * from ${TBL_COURSE} order by lastModify desc limit 10`),

  // Get 10 most viewed courses
  get10MostViewedCourses: () =>
    db.load(`select * from ${TBL_COURSE} order by views desc limit 10`),

  // Get quantity by category
  getQuantityByCategory: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_COURSE} where category = ${id}`
    );
    if (rows.length == null) return null;
    return rows;
  },
};
