const Router = require("express");
const userService = require("../../bussiness/services/user.service");
const auth = require("../middleware/auth.mdw");
const router = Router();
router.post("/user", async (req, res) => {
  console.log("hahahaha");
  console.log(req.body);
  const message = await userService.createOneUser(req.body);
  res.json({ message }).end();
});
router.post("/authenticate-user", async (req, res) => {
  const message = await userService.signIn(req.body);
  res.json({ message }).end();
});

router.get("/users", auth, async (req, res) => {
  const message = await userService.getAllUser();
  res.json({ message }).end();
});
router.get("/user/:id", async (req, res) => {
  const message = await userService.getOneUser(req);
  res.json({ message }).end();
});
router.delete("/user", auth, async (req, res) => {
  const message = await userService.deleteOneUser(req.body);
  res.json({ message }).end();
});
router.put("/user/:id", auth, async (req, res) => {
  const message = await userService.updateOneUser(req);
  res.json({ message }).end();
});

module.exports = router;
