const db = require('../utils/db');

const TBL_SUBCATEGORY = 'subcategory';
const TBL_COURSE = 'course';

module.exports = {
    all() {
        return db.load(`select * from ${TBL_SUBCATEGORY}`);
    },

    async single(id) {
        const rows = await db.load(`select * from ${TBL_SUBCATEGORY} where id = '${id}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    async singleBycategoryName(categoryName) {
        const rows = await db.load(`select * from ${TBL_SUBCATEGORY} where subCategoryName = '${categoryName}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    add(entity) {
        return db.add(entity, TBL_SUBCATEGORY)
    },

    async update(id, entity) {
        return db.patch(entity, { id: id }, TBL_SUBCATEGORY);
    },

    async delete(id) {
        const rows = await db.load(`select * from ${TBL_COURSE} where categoryId='${id}'`);
        if (rows.length === 0) {
            return db.del({ id: id }, TBL_SUBCATEGORY)
        }
        return null
    }
}