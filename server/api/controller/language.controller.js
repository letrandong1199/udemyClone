const Router = require("express");
const languageService = require("../../business/services/language.service");
const authAdmin = require("../middleware/authAdmin.mdw");
const authTeacher = require("../middleware/authTeacher.mdw");
const router = Router();
router.post("/languages", authAdmin, async (req, res) => {
  console.log(req.body);
  const message = await languageService.createOneLanguage(req.body);
  res.json({ message }).end();
});
router.get("/languages", async (req, res) => {
  const message = await languageService.getAllLanguage();
  res.json({ message }).end();
});
router.delete("/languages/:id", authAdmin, async (req, res) => {
  const message = await languageService.deleteOneLanguage(req);
  res.json({ message }).end();
});

module.exports = router;
