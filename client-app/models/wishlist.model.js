const db = require("../utils/db");
const TBL_USERS = "user";
const TBL_WISHLIST = "wishlist";

module.exports = {
  all() {
    return db.load(`select * from ${TBL_WISHLIST}`);
  },

  async single(id) {
    const rows = await db.load(
      `select * from ${TBL_WISHLIST} where id='${id}'`
    );
    if (rows.length === 0) return null;

    return rows[0];
  },

  add(entity) {
    return db.add(entity, TBL_WISHLIST);
  },
};
