const updateOneUserResponseEnum = require("../enums/userEnums/updateOneUserResponseEnum");
module.exports = updateInfoValidator = {
  validate(id, name, password) {
    if (id == null || id == "") {
      return { Code: updateOneUserResponseEnum.ID_EMPTY, IsSuccess: false };
    }
    if (name == null || name == "") {
      return {
        Code: updateOneUserResponseEnum.NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: updateOneUserResponseEnum.SUCCESS, IsSuccess: true };
  },
};
