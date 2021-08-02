const db = require("../db/db");
const operatorType = require("../utils/enums/operatorType");
const enrolledcourseRepository = {
  getEnrolledCourseByUserIdAndCourseId(query) {
    return db("Enrolled_Courses")
      .where(query)
      .catch(() => operatorType.FAIL.READ);
  },
  updateEnrolledCourseByUserIdAndCourseId(query, newEnrolledCourse) {
    return db("Enrolled_Courses")
      .where(query)
      .update(newEnrolledCourse)
      .catch(() => operatorType.FAIL.UPDATE);
  },
  addEnrolledCourse(newEnrolledCourse) {
    return db("Enrolled_Courses")
      .insert(newEnrolledCourse)
      .catch(() => operatorType.FAIL.CREATE);
  },
  getEnrolledCourseByCourse(course_id) {
    return db("Enrolled_Courses")
      .where("Course_Id", course_id)
      .catch(() => operatorType.FAIL.READ);
  },
  getEnrolledCourseByUser(user_id) {
    return db("Enrolled_Courses")
      .where("User_Id", user_id)
      .join("Courses", `Enrolled_Courses.Course_Id`, `Courses.Id`)
      .catch(() => operatorType.FAIL.READ);
  },
};
module.exports = enrolledcourseRepository;
