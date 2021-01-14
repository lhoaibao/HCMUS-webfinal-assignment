const db = require("../utils/db");
const TBL = "subcategory";
module.exports = {
  all: () => db.load(`select * from ${TBL}`),


  single: async (id) => {
    const rows = await db.load(`select * from ${TBL} where id = '${id}' `);
    if (rows.length == null) return null;
    return rows[0];
  },
  add: (entity) => db.add(entity, TBL),
};
