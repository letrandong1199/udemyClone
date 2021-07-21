const Router = require("express");
const languageService = require("../../bussiness/services/language.service");
const auth = require("../middleware/auth.mdw");
const router = Router();
router.post("/language", async (req, res) => {
  console.log(req.body);
  const message = await languageService.createOneLanguage(req.body);
  res.json({ message }).end();
});
router.get("/languages", auth, async (req, res) => {
  const message = await languageService.getAllLanguage();
  res.json({ message }).end();
});
router.delete("/language/:id", auth, async (req, res) => {
  const message = await languageService.deleteOneLanguage(req);
  res.json({ message }).end();
});

module.exports = router;
