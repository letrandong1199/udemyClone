const getOneUserResponseEnum = require("../enums/userEnums/getOneUserResponseEnum");
module.exports = getOneUserValidator = {
  validate(id) {
    if (id == null || id == "") {
      return { Code: getOneUserResponseEnum.ID_IS_EMPTY, IsSuccess: false };
    }
    return { Code: getOneUserResponseEnum.SUCCESS, IsSuccess: true };
  },
};
