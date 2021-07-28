const updateOneEnrolledCourseResponseEnum = require("../enums/enrolledcourseEnums/updateOneEnrolledCourseResponseEnum");
module.exports = {
  validate(user_id, course_id, id) {
    if (user_id == null || user_id == "") {
      return {
        Code: updateOneEnrolledCourseResponseEnum.USER_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: updateOneEnrolledCourseResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: updateOneEnrolledCourseResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
