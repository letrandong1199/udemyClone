const Router = require("express");
const courseService = require("../../business/services/course.service");
const authUser = require("../middleware/authUser.mdw");
const authTeacher = require("../middleware/authTeacher.mdw");
const router = Router();
router.post("/courses", authTeacher, async (req, res) => {
  const message = await courseService.createOneCourse(req);
  res.json({ message });
});
router.get("/courses", async (req, res) => {
  console.log(req.query);
  const message = await courseService.getAllCourse(req);
  res.json({ message });
});
router.get("/courses/:id", async (req, res) => {
  const message = await courseService.getOneCourse(req);
  res.json({ message });
});
router.get("/my-learning/:id", authUser, async (req, res) => {
  const message = await courseService.getMyLearning(req);
  res.json({ message });
});
router.put("/courses/:id", authTeacher, async (req, res) => {
  const message = await courseService.updateOneCourse(req);
  res.json({ message });
});

module.exports = router;
