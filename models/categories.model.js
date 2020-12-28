const db = require("../utils/db");

module.exports = {
  all: () => db.load("select * from categories"),

  single: async (id) => {
    const rows = await db.load(`select * from categories where id = ${id}`)
    if (rows.length == null)
      return null;
    return rows[0];
  },

  add: (entity) => db.add(entity, 'categories');
};
