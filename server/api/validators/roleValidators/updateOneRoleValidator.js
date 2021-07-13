const updateOneRoleResponseEnum = require("../enums/roleEnums/updateOneRoleResponseEnum");
module.exports = updateOneUserValidator = {
  validate(id, name) {
    if (id == null || id == "") {
      return { Code: updateOneRoleResponseEnum.ID_IS_EMPTY, IsSuccess: false };
    }
    if (name == null || name == "") {
      return {
        Code: updateOneRoleResponseEnum.ROLE_NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: updateOneRoleResponseEnum.SUCCESS, IsSuccess: true };
  },
};
