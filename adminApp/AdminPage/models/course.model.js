const db = require('../utils/db');

const TBL_COURSE = 'course';

module.exports = {
    all() {
        return db.load(`select * from ${TBL_COURSE}`);
    },

    add(entity) {
        return db.add(entity, TBL_COURSE)
    },
};