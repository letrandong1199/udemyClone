const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const promoteRepository = {
  //READ BY NAME
  getPromoteByPromote(promote) {
    return db("Promotes")
      .where("Promote", promote)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = promoteRepository;
