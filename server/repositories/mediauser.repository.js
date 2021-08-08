const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const mediaUserRepository = {
  getPlayedByUserIdAndMediaId(query) {
    return db("Media_User")
      .where(query)
      .catch(() => operatorType.FAIL.READ);
  },
  updatePlayedByUserIdAndMediaId(query, played) {
    return db("Media_User")
      .where(query)
      .update(played)
      .catch(() => operatorType.FAIL.UPDATE);
  },
  addMediaUser(newMediaUser) {
    return db("Media_User")
      .insert(newMediaUser)
      .catch(() => operatorType.FAIL.CREATE);
  },
};
module.exports = mediaUserRepository;
