const Router = require("express");
const sectionService = require("../../bussiness/services/section.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/section", authTeacher, async (req, res) => {
  const message = await sectionService.createOneSection(req);
  res.json({ message }).end();
});
router.put("/section/:id", authTeacher, async (req, res) => {
  const message = await sectionService.updateOneSection(req);
  res.json({ message }).end();
});
module.exports = router;
