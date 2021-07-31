const Router = require("express");
const wishlistService = require("../../business/services/wishlist.service");
const authUser = require("../middleware/authUser.mdw");

console.log('Im route');
const router = Router();
router.post("/wishlists", authUser, async (req, res) => {
  const message = await wishlistService.createOneWishlist(req);
  res.json({ message }).end();
});
router.delete("/wishlists", authUser, async (req, res) => {
  const message = await wishlistService.deleteOneWishlist(req);
  res.json({ message }).end();
});
router.get("/wishlists", authUser, async (req, res) => {
  const message = await wishlistService.getAllWishlists(req);

  res.json({ message }).end();
})


module.exports = router;
