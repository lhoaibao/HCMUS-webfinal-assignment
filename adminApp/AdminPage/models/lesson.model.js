const db = require('../utils/db');

const TBL_LESSON = 'lesson'

module.exports = {
    all(condition) {
        return db.load(`select * from ${TBL_LESSON} ${condition}`);
    },

    add(entity) {
        return db.add(entity, TBL_LESSON)
    },

    async single(id) {
        const rows = await db.load(`select * from ${TBL_LESSON} where id = ${id}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    async update(id, entity) {
        return db.patch(entity, {id: id}, TBL_LESSON);
    },
};