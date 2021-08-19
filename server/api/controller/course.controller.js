const Router = require("express");
const courseService = require("../../business/services/course.service");
const authUser = require("../middleware/authUser.mdw");
const authTeacher = require("../middleware/authTeacher.mdw");
const authAdmin = require("../../api/middleware/authAdmin.mdw");
const countView = require("../../api/middleware/countView.mdw");
const router = Router();
router.post("/courses", authTeacher, async (req, res) => {
  const message = await courseService.createOneCourse(req);
  res.json({ message });
});
router.get("/courses", async (req, res) => {
  console.log(req.query);
  const message = await courseService.getAllCourseQuery(req);
  res.json({ message });
});
router.get("/courses/manage", authAdmin, async (req, res) => {
  const message = await courseService.getAllCourse(req);
  res.json({ message });
});
router.get("/courses/most-view", async (req, res) => {
  const message = await courseService.getMostView(req);
  res.json({ message });
});
router.get("/courses/most-recent", async (req, res) => {
  const message = await courseService.getMostRecent(req);
  res.json({ message });
});
router.get("/courses/most-register", async (req, res) => {
  const message = await courseService.getMostRegister(req);
  res.json({ message });
});
router.get("/courses/:id", countView, async (req, res) => {
  const message = await courseService.getOneCourse(req);
  res.json({ message });
});
router.get("/my-learning/:id", authUser, async (req, res) => {
  const message = await courseService.getMyLearning(req);
  res.json({ message });
});
router.get("/my-courses", authTeacher, async (req, res) => {
  const message = await courseService.getCourseOfInstructor(req);
  res.json({ message });
});
router.get("/my-courses/:id", authTeacher, async (req, res) => {
  const message = await courseService.getOneCourseInstructor(req);
  res.json({ message });
});
router.put("/courses/:id", authTeacher, async (req, res) => {
  const message = await courseService.updateOneCourse(req);
  res.json({ message });
});
router.put("/courses/is-blocked/:id", authAdmin, async (req, res) => {
  const message = await courseService.blockOneCourse(req);
  res.json({ message });
});

module.exports = router;
