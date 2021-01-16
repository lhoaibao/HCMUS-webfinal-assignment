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

  async byUser(id) {
    const rows = await db.load(
      `select * from ${TBL_WISHLIST} where userId='${id}'`
    );
    if (rows.length === 0) return null;

    return rows;
  },

  add(entity) {
    return db.add(entity, TBL_WISHLIST);
  },
  delete(id) {
    return db.del({id:id}, TBL_WISHLIST);
  },
};
