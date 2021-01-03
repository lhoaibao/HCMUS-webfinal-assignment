const db = require('../utils/db');

const TBL_COURSES = 'courses';

module.exports = {
    all() {
        return db.load(`select * from ${TBL_COURSES}`);
    },

    
};