const Router = require("express");
const courseService = require("../../business/services/course.service");
const authAdmin = require("../middleware/authAdmin.mdw");
const router = Router();
router.post("/courses", async (req, res) => {
  const message = await courseService.createOneCourse(req.body);
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
router.put("/courses/:id", async (req, res) => {
  const message = await courseService.updateOneCourse(req);
  res.json({ message });
});


module.exports = router;
