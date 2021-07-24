const Router = require("express");
const roleService = require("../../bussiness/services/role.service");
const authAdmin = require("../middleware/authAdmin.mdw");
const router = Router();
router.post("/role", authAdmin, async (req, res) => {
  console.log(req.body);
  const message = await roleService.createOneRole(req.body);
  res.json({ message }).end();
});
router.get("/roles", authAdmin, async (req, res) => {
  const message = await roleService.getAllRole();
  res.json({ message }).end();
});
router.delete("/role/:id", authAdmin, async (req, res) => {
  const message = await roleService.deleteOneRole(req);
  res.json({ message }).end();
});
router.put("/role/:id", authAdmin, async (req, res) => {
  const message = await roleService.updateOneRole(req);
  res.json({ message }).end();
});

module.exports = router;
