const Router = require("express");
const categoryService = require("../../bussiness/services/category.service");
const auth = require("../middleware/auth.mdw");
const router = Router();
router.post("/category", async (req, res) => {
  console.log(req.body);
  const message = await categoryService.createOneCategory(req.body);
  res.json({ message }).end();
});
router.get("/categories", auth, async (req, res) => {
  const message = await categoryService.getAllCategory();
  res.json({ message }).end();
});
router.delete("/category/:id", auth, async (req, res) => {
  const message = await categoryService.deleteOneCategory(req);
  res.json({ message }).end();
});
router.put("/category/:id", auth, async (req, res) => {
  const message = await categoryService.updateOneCategory(req);
  res.json({ message }).end();
});

module.exports = router;
