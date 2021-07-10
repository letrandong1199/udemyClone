const Router = require("express");
const userService = require("../../bussiness/services/user.service");
const router = Router();
router.post("/user", async (req, res) => {
  console.log("hahahaha");
  console.log(req.body);
  const message = await userService.createOneUser(req.body);
  res.json({ message }).end();
});
module.exports = router;
