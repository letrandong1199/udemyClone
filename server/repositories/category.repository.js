const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const categoryRepository = {
  getAllCategory(query) {
    return db("Categories").catch(() => operatorType.FAIL.NOT_EXIST);
  },
  //READ BY NAME
  getCategoryByName(name) {
    return db("Categories")
      .where("Name", name)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCategoryByQuery(name) {
    return db("Categories")
      .whereRaw(`to_tsvector("Name") @@ websearch_to_tsquery(?)`, name)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCategoryByParent(id) {
    let filtered = db("Categories").where("Parent_Id", id);
    console.log(filtered.toSQL().toNative());
    return filtered.catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = categoryRepository;
