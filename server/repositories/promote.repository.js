const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const promoteRepository = {
  //READ BY NAME
  getPromoteByPrice(price) {
    return db("Promotes")
      .where("Price", price)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = promoteRepository;
