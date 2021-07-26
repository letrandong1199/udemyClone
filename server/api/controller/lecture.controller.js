const Router = require("express");
const lectureService = require("../../bussiness/services/lecture.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/lecture", authUser, async (req, res) => {
  const message = await lectureService.createOneLecture(req);
  res.json({ message }).end();
});
router.put("/lecture/:id", authUser, async (req, res) => {
  const message = await lectureService.updateOneLecture(req);
  res.json({ message }).end();
});
router.get("/lectures/:id", authUser, async (req, res) => {
  const message = await lectureService.getLectureBySection(req);
  res.json({ message }).end();
});
router.delete("/lecture/:id", authUser, async (req, res) => {
  const message = await lectureService.deleteOneLecture(req);
  res.json({ message }).end();
});

module.exports = router;
