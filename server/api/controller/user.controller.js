const Router = require("express");
const userService = require("../../bussiness/services/user.service");
const authAdmin = require("../middleware/authAdmin.mdw");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
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

router.post("/refresh-token", async (req, res) => {
  const message = await userService.refreshToken(req.body);
  res.json({ message }).end();
})

router.get("/users", authAdmin, async (req, res) => {
  const message = await userService.getAllUser();
  res.json({ message }).end();
});

router.get("/get-info", authUser, async (req, res) => {
  const message = await userService.getOneUser(req);
  res.json({ message }).end();
});

router.get("/user/:id", authAdmin, async (req, res) => {
  const message = await userService.getOneUser(req.params);
  res.json({ message }).end();
});

router.delete("/user/:id", authAdmin, async (req, res) => {
  const message = await userService.deleteOneUser(req);
  res.json({ message }).end();
});

router.put("/user/update-user", authUser, async (req, res) => {
  const message = await userService.updateOneUser(req);
  res.json({ message }).end();
});

module.exports = router;
