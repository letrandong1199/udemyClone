const Router = require("express");
const sectionService = require("../../bussiness/services/section.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/section", authUser, async (req, res) => {
  const message = await sectionService.createOneSection(req);
  res.json({ message }).end();
});
router.put("/section/:id", authUser, async (req, res) => {
  const message = await sectionService.updateOneSection(req);
  res.json({ message }).end();
});
router.get("/sections/:id", authUser, async (req, res) => {
  const message = await sectionService.getSectionByCourse(req);
  res.json({ message }).end();
});
router.delete("/section/:id", authUser, async (req, res) => {
  const message = await sectionService.deleteOneSection(req);
  res.json({ message }).end();
});

module.exports = router;
