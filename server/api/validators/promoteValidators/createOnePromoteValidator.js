const createOnePromoteResponseEnum = require("../enums/promoteEnums/createOnePromoteResponseEnum");
const createOnePromoteValidator = {
  validate(promote) {
    if (typeof promote != "number") {
      return {
        Code: createOnePromoteResponseEnum.PROMOTE_IS_INVALID,
        IsSuccess: false,
      };
    }
    return { Code: createOnePromoteResponseEnum.SUCCESS, IsSuccess: true };
  },
};
module.exports = createOnePromoteValidator;
