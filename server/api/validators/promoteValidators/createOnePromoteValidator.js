const createOnePromoteResponseEnum = require("../enums/promoteEnums/createOnePromoteResponseEnum");
const createOnePromoteValidator = {
  validate(price) {
    if (typeof price != "number") {
      return {
        Code: createOnePromoteResponseEnum.PROMOTE_IS_INVALID,
        IsSuccess: false,
      };
    }
    return { Code: createOnePromoteResponseEnum.SUCCESS, IsSuccess: true };
  },
};
module.exports = createOnePromoteValidator;
