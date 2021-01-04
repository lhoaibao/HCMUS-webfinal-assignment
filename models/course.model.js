const db = require("../utils/db");

module.exports = {
  all: () => db.load("select * from course"),

  single: async (id) => {
    const rows = await db.load(`select * from course where id = ${id}`)
    if (rows.length == null)
      return null;
    return rows[0];
  },

  add: (entity) => db.add(entity, 'course');
};
