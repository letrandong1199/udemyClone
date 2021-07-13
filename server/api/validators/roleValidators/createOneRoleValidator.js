const createOneRoleResponseEnum = require("../enums/roleEnums/createOneRoleResponseEnum");
const createOneRoleValidator = {
  validate(name) {
    if (name == null || name == "") {
      return {
        Code: createOneRoleResponseEnum.ROLE_NAME_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: createOneRoleResponseEnum.SUCCESS, IsSuccess: true };
  },
};
module.exports = createOneRoleValidator;
