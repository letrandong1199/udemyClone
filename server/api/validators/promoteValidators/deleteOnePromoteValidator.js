const deleteOnePromoteResponseEnum = require("../enums/promoteEnums/deleteOnePromoteResponseEnum");
module.exports = deleteOnePromoteValidator = {
  validate(id) {
    if (id == null || id == "") {
      return {
        Code: deleteOnePromoteResponseEnum.ID_IS_EMPTY,
        IsSuccess: false,
      };
    }
    return { Code: deleteOnePromoteResponseEnum.SUCCESS, IsSuccess: true };
  },
};
