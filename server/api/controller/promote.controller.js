const Router = require("express");
const promoteService = require("../../bussiness/services/promote.service");
const auth = require("../middleware/auth.mdw");
const router = Router();
router.post("/promote", async (req, res) => {
  console.log(req.body);
  const message = await promoteService.createOnePromote(req.body);
  res.json({ message }).end();
});
router.get("/promotes", auth, async (req, res) => {
  const message = await promoteService.getAllPromote();
  res.json({ message }).end();
});
router.delete("/promote/:id", auth, async (req, res) => {
  const message = await promoteService.deleteOnePromote(req);
  res.json({ message }).end();
});

module.exports = router;
