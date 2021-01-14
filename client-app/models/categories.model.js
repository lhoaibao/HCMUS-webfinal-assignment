const db = require("../utils/db");
const TBL_CATEGORY = "category";
const TBL_SUBCATEGORY = "subcategory";
module.exports = {
  all: () => db.load(`select * from ${TBL_CATEGORY}`),
  single: async (id) => {
    const rows = await db.load(
      `select * from ${TBL_CATEGORY} where id = '${id}' `
    );
    if (rows.length == null) return null;
    return rows[0];
  },
  add: (entity) => db.add(entity, TBL),
  getQuantityOfSubCategory: () =>
    db.load(
      `select categoryName, count(categoryName) as subCatQuantity from category, subcategory where subcategory.categoryId = category.id group by categoryName;`
    ),
};
