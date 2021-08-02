const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const languageRepository = {
  //READ BY NAME
  getLanguageByName(name) {
    return db("Languages")
      .where("Name", name)
      .catch(() => operatorType.FAIL.NOT_EXIST);
  },
};
module.exports = languageRepository;
