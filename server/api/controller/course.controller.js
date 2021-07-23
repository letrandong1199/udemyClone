const Router = require("express");
const courseService = require("../../bussiness/services/course.service");
const router = Router();
router.post("/course", async (req, res) => {
  const message = await courseService.createOneCourse(req.body);
  res.json({ message });
});
module.exports = router;
