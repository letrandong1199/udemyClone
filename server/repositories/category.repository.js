const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const categoryRepository = {
  getCategoryByQuery(query) {
    return db("Categories").where(query)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  //READ BY NAME
  getCategoryByName(name) {
    return db("Categories")
      .where("Name", name)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = categoryRepository;
