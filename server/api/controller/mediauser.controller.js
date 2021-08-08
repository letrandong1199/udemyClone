const Router = require("express");
const mediaUserService = require("../../business/services/mediauser.service");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/media-user", authUser, async (req, res) => {
  const message = await mediaUserService.createOneMediaUser(req);
  res.json({ message }).end();
});
router.get("/media-user/:id", authUser, async (req, res) => {
  const message = await mediaUserService.getOneMediaUser(req);
  res.json({ message }).end();
});

module.exports = router;
