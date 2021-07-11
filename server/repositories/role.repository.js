const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const roleRepository = {
  //READ BY NAME
  getRoleByName(name) {
    return db("Role")
      .where("Name", name)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = roleRepository;
