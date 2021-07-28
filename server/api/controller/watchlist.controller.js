const Router = require("express");
const watchlistService = require("../../business/services/watchlist.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/watchlists", authUser, async (req, res) => {
  const message = await watchlistService.createOneWatchlist(req);
  res.json({ message }).end();
});
router.delete("/watchlists/:id", authUser, async (req, res) => {
  const message = await watchlistService.deleteOneWatchlist(req);
  res.json({ message }).end();
});

module.exports = router;
