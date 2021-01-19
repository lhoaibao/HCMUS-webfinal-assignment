const db = require("../utils/db");
const TBL_USERS = "user";
const TBL_CART = "cart";

module.exports = {
  all() {
    return db.load(`select * from ${TBL_CART}`);
  },

  async single(id) {
    const rows = await db.load(
      `select * from ${TBL_CART} where id='${id}'`
    );
    if (rows.length === 0) return null;

    return rows[0];
  },

  async byUser(id) {
    const rows = await db.load(
      `select * from ${TBL_CART} where userId='${id}'`
    );
    if (rows.length === 0) return null;

    return rows;
  },

  add(entity) {
    return db.add(entity, TBL_CART);
  },
  delete(id) {
    return db.del({id:id}, TBL_CART);
  },
};
