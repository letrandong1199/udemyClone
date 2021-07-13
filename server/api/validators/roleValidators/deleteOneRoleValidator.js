const deleteOneRoleResponseEnum = require("../enums/roleEnums/deleteOneRoleResponseEnum");
module.exports = deleteOneUserValidator = {
  validate(id) {
    if (id == null || id == "") {
      return {
        Code: deleteOneRoleResponseEnum.ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOneRoleResponseEnum.SUCCESS, IsSuccess: true };
  },
};
