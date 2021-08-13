const deleteOneWishlistResponseEnum = require("../enums/wishlistEnums/deleteOneWishlistResponseEnum");
module.exports = {
  validate(user_id, course_id) {
    if (user_id == null || user_id == "") {
      return {
        Code: deleteOneWishlistResponseEnum.USER_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: deleteOneWishlistResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return { Code: deleteOneWishlistResponseEnum.SUCCESS, Isuccess: true };
  },
};
