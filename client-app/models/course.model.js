const db = require("../utils/db");

const TBL_COURSE = "course";
module.exports = {
  all: () => db.load(`select * from ${TBL_COURSE} where isCompleted='Completed' and status='active'`),

  single: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_COURSE} where id = '${id}' and isCompleted='Completed' and status='active'`
    );
    if (rows.length === null) return null;
    return rows[0];
  },  

  getCourseBySubCategory: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_COURSE} where categoryId='${id}' and isCompleted='Completed' and status='active'`
    );

    if (rows.length === null) return null;
    return rows;
  },

  add: (entity) => db.add(entity, TBL_COURSE),

  // Get 10 latest coures
  get10LatestCourses: () =>
    db.load(`select * from ${TBL_COURSE} where isCompleted='Completed' and status='active' order by createAt desc limit 10`),

  // Get 10 most viewed courses
  get10MostViewedCourses: () =>
    db.load(`select * from ${TBL_COURSE} where isCompleted='Completed' and status='active' order by views desc limit 10`),

  // Get quantity by category
  getQuantityByCategory: async (id) => {
    const rows = await db.load(
      `select count(*) as catQuantity from ${TBL_COURSE} where categoryId = '${id}' and isCompleted='Completed' and status='active'`
    );
    if (rows.length == null) return null;
    return rows[0];
  },
};
