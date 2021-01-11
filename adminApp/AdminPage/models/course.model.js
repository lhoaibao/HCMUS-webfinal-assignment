const db = require('../utils/db');

const TBL_COURSE = 'course';

module.exports = {
    all(field, condition) {
        return db.load(`select ${field} from ${TBL_COURSE} ${condition}`);
    },

    add(entity) {
        return db.add(entity, TBL_COURSE)
    },

    async single(id) {
        const rows = await db.load(`select * from ${TBL_COURSE} where id = '${id}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    async update(id, entity) {
        return db.patch(entity, { id: id }, TBL_COURSE);
    },

    async delete(id) {
        return db.del({ id: id }, TBL_COURSE)
    }
};