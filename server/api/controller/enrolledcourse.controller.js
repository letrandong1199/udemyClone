const Router = require("express");
const enrolledcourseService = require("../../business/services/enrolledcourse.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/enrolled-courses", authUser, async (req, res) => {
  const message = await enrolledcourseService.createOneEnrolledCourse(req);
  res.json({ message }).end();
});
router.put("/enrolled-courses", authUser, async (req, res) => {
  const message = await enrolledcourseService.updateOneEnrolledCourse(req);
  res.json({ message }).end();
});

module.exports = router;
