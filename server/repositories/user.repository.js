const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const userRepository = {
  //READ BY EMAIL
  getUserByEmail(email) {
    return db("Users")
      .where("Email", email)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = userRepository;
