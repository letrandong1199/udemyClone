const createOneWishlistResponseEnum = require("../enums/wishlistEnums/createOneWishlistResponseEnum");
module.exports = {
  validate(user_id, course_id) {
    if (user_id == null || user_id == "") {
      return {
        Code: createOneWishlistResponseEnum.USER_ID_IS_EMPTY,
        ISuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: createOneWishlistResponseEnum.COURSE_ID_IS_EMPTY,
        ISuccess: false,
      };
    }
    return { Code: createOneWishlistResponseEnum.SUCCESS, ISuccess: true };
  },
};
