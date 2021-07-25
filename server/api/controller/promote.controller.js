const Router = require("express");
const promoteService = require("../../bussiness/services/promote.service");
const authAdmin = require("../middleware/authAdmin.mdw");
const router = Router();
router.post("/promote", authAdmin, async (req, res) => {
  console.log(req.body);
  const message = await promoteService.createOnePromote(req.body);
  res.json({ message }).end();
});
router.get("/promotes", authAdmin, async (req, res) => {
  const message = await promoteService.getAllPromote();
  res.json({ message }).end();
});
router.delete("/promote/:id", authAdmin, async (req, res) => {
  const message = await promoteService.deleteOnePromote(req);
  res.json({ message }).end();
});

module.exports = router;