const Router = require("express");
const courseService = require("../../bussiness/services/course.service");
const authAdmin = require("../middleware/authAdmin.mdw");
const router = Router();
router.post("/course", async (req, res) => {
  const message = await courseService.createOneCourse(req.body);
  res.json({ message });
});
router.get("/courses", async (req, res) => {
  const message = await courseService.getAllCourse();
  res.json({ message });
});
router.get("/course/:id", async (req, res) => {
  const message = await courseService.getOneCourse(req);
  res.json({ message });
});
router.put("/course/:id", async (req, res) => {
  const message = await courseService.updateOneCourse(req);
  res.json({ message });
});

module.exports = router;
