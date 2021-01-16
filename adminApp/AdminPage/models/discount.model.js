const db = require('../utils/db');

const TBL_DISCOUNT = 'discount';

module.exports = {
    all() {
        return db.load(`select * from ${TBL_DISCOUNT}`);
    },

    async single(id) {
        const rows = await db.load(`select * from ${TBL_DISCOUNT} where id = '${id}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    add(entity) {
        return db.add(entity, TBL_DISCOUNT)
    },

    async update(id, entity) {
        return db.patch(entity, { id: id }, TBL_DISCOUNT);
    }
}