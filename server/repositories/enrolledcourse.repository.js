const db = require("../db/db");
const moment = require("moment");
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
  getCourseMostRegister() {
    let filtered = db("Enrolled_Courses");
    let now = moment().format("YYYY-MM-DD");
    console.log(now);
    filtered = filtered.whereRaw(`?-"Enrolled_Date" <= ? `, [now, 7]);
    filtered
      .select("Course_Id")
      .count("User_Id")
      .groupBy("Course_Id")
      .orderBy("count", "desc")
      .limit(10);
    return filtered;
  },
};
module.exports = enrolledcourseRepository;
