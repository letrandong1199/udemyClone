const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const categoryRepository = {
  getAllCategory(query) {
    return db("Categories")
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  //READ BY NAME
  getCategoryByName(name) {
    return db("Categories")
      .where("Name", name)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCategoryByQuery(name) {
    return db("Categories")
      .where("Name", "like", `%${name}%`)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  getCategoryByParent(id) {
    return db("Categories")
      .where("Parent_Id", id)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = categoryRepository;
