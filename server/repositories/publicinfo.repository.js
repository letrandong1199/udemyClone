const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");

const publicInfoRepository = {
  getPublicInfoByUserId(user_id) {
    return db("Public_Information")
      .where("User_Id", user_id)
      .catch(() => operatorType.FAIL.READ);
  },
  addPublicInfo(newPublicInfo) {
    return db("Public_Information")
      .insert(newPublicInfo)
      .catch(() => operatorType.FAIL.CREATE);
  },
  updatePublicInfoByUserId(user_id, newPublicInfo) {
    return db("Public_Information")
      .where("User_Id", user_id)
      .update(newPublicInfo)
      .catch(() => operatorType.FAIL.UPDATE);
  },
};
module.exports = publicInfoRepository;
