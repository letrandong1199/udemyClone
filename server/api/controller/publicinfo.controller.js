const Router = require("express");
const publicInfoService = require("../../business/services/publicinfo.service");
const authAdmin = require("../middleware/authAdmin.mdw");
const authTeacher = require("../middleware/authTeacher.mdw");
const router = Router();
router.post("/public-info", authTeacher, async (req, res) => {
  const message = await publicInfoService.updateOnePublicInfo(req);
  res.json({ message }).end();
});
router.get("/public-info", authTeacher, async (req, res) => {
  const message = await publicInfoService.getPublicInfo(req);
  res.json({ message }).end();
});
module.exports = router;
