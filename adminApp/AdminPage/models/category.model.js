const db = require('../utils/db');

const TBL_CATEGORY = 'category';
const TBL_COURSE = 'course';

module.exports = {
    all() {
        return db.load(`select * from ${TBL_CATEGORY}`);
    },

    async single(id) {
        const rows = await db.load(`select * from ${TBL_CATEGORY} where id = ${id}`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    async singleBycategoryName(categoryName) {
        const rows = await db.load(`select * from ${TBL_CATEGORY} where categoryName = '${categoryName}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    add(entity) {
        return db.add(entity, TBL_CATEGORY)
    },

    async update(id, entity) {
        return db.patch(entity, { id: id }, TBL_CATEGORY);
    },

    async delete(id) {
        const rows = await db.load(`select * from ${TBL_COURSE} where categoryId=${id}`);
        if (rows.length === 0) {
            return db.del({ id: id }, TBL_CATEGORY)
        }
        return null
    }
}