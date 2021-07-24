const Router = require("express");
const categoryService = require("../../bussiness/services/category.service");
const authUser = require("../middleware/authUser.mdw");
const authAdmin = require("../middleware/authAdmin.mdw");
const authTeacher = require("../middleware/authTeacher.mdw");
const router = Router();
router.post("/category", authAdmin, async (req, res) => {
  console.log(req.body);
  const message = await categoryService.createOneCategory(req.body);
  res.json({ message }).end();
});
router.get("/categories", authUser, async (req, res) => {
  const message = await categoryService.getAllCategory();
  res.json({ message }).end();
});
router.delete("/category/:id", authAdmin, async (req, res) => {
  const message = await categoryService.deleteOneCategory(req);
  res.json({ message }).end();
});
router.put("/category/:id", authAdmin, async (req, res) => {
  const message = await categoryService.updateOneCategory(req);
  res.json({ message }).end();
});

module.exports = router;
