const Router = require("express");
const watchlistService = require("../../business/services/watchlist.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const { route } = require("./user.controller");
const router = Router();
router.post("/wishlists", authUser, async (req, res) => {
  const message = await watchlistService.createOneWatchlist(req);
  res.json({ message }).end();
});
router.delete("/wishlists", authUser, async (req, res) => {
  const message = await watchlistService.deleteOneWatchlist(req);
  res.json({ message }).end();
});


module.exports = router;
