const Router = require("express");
const roleService = require("../../bussiness/services/role.service");
const auth = require("../middleware/auth.mdw");
const router = Router();
router.post("/role", async (req, res) => {
  console.log(req.body);
  const message = await roleService.createOneRole(req.body);
  res.json({ message }).end();
});
router.get("/roles", auth, async (req, res) => {
  const message = await roleService.getAllRole();
  res.json({ message }).end();
});
router.delete("/role/:id", auth, async (req, res) => {
  const message = await roleService.deleteOneRole(req);
  res.json({ message }).end();
});
router.put("/role/:id", auth, async (req, res) => {
  const message = await roleService.updateOneRole(req);
  res.json({ message }).end();
});

module.exports = router;
