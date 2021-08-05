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
    let date = new Date((new Date()).getTime() - 604800000)
    console.log(now);
    // createday >= Now - 7
    // Get current day: 0 - 6

    filtered = filtered.where("Enrolled_Date", ">=", date.toISOString())
    filtered
      .select("Course_Id")
      .count("User_Id as Number_Of_Enrollment")
      .groupBy("Course_Id")
      .orderBy("Number_Of_Enrollment", "desc")
      .limit(10);
    return filtered;
  },
  getCategoriesMostRegister() {
    let filtered = db("Enrolled_Courses");
    let date = new Date((new Date()).getTime() - 604800000)

    filtered = filtered.where("Enrolled_Date", ">=", date.toISOString())
    filtered = filtered
      .from("Enrolled_Courses")
      .rightJoin("Courses", "Course_Id", "Courses.Id")
      .select("Category_Id")
      .count()
      .groupBy("Category_Id")

    return filtered;
  },
};
module.exports = enrolledcourseRepository;
