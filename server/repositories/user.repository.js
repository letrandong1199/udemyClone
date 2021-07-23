const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const userRepository = {
  //READ BY EMAIL
  getUserByEmail(email) {
    return db("Users")
      .where("Email", email)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
  //DELETE BY EMAIL
  deleteUserByEmail(email) {
    return db("Users")
      .where("Email", email)
      .del()
      .catch(() => operatorType.FAIL.DELETE);
  },
};
module.exports = userRepository;
