const createOneEnrolledCourseResponseEnum = require("../enums/enrolledcourseEnums/createOneEnrolledCourseResponseEnum");
module.exports = {
  validate(user_id, course_id) {
    if (user_id == null || user_id == "") {
      return {
        Code: createOneEnrolledCourseResponseEnum.USER_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    if (course_id == null || course_id == "") {
      return {
        Code: createOneEnrolledCourseResponseEnum.COURSE_ID_IS_EMPTY,
        Isuccess: false,
      };
    }
    return {
      Code: createOneEnrolledCourseResponseEnum.SUCCESS,
      Isuccess: true,
    };
  },
};
