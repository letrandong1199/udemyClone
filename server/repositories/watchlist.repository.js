const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const watchlistRepository = {
  getWatchlistByUserId(user_id) {
    return db("Watch_Lists")
      .where("User_Id", user_id)
      .catch(() => operatorType.FAIL.READ);
  },
};
module.exports = watchlistRepository;
