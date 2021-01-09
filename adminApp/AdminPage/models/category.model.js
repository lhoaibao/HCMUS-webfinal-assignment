const db = require('../utils/db');

const TBL_CATEGORY = 'category';
const TBL_COURSE = 'course';

module.exports = {
    all() {
        return db.load(`select * from ${TBL_CATEGORY}`);
    },
    async singleByUserName(name) {
        const rows = await db.load(`select * from ${TBL_CATEGORY} where name = '${name}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },
    add(entity) {
        return db.add(entity, TBL_CATEGORY)
    },

    async del(name) {
        const rows = await db.load(`select * from ${TBL_COURSE} where category=${name}`);
        if (rows.length === 0) {
            return null
        }
        return db.del({ name: name }, TBL_CATEGORY)
    }
}