const Router = require("express");
const mediaService = require("../../business/services/media.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/medias", async (req, res) => {
  const message = await mediaService.createOneMedia(req);
  res.json({ message }).end();
});
router.put("/medias/:id", async (req, res) => {
  const message = await mediaService.updateOneMedia(req);
  res.json({ message }).end();
});
router.get("/medias/:id", async (req, res) => {
  const message = await mediaService.getMediaByLecture(req);
  res.json({ message }).end();
});
router.delete("/medias/:id", async (req, res) => {
  const message = await mediaService.deleteOneMedia(req);
  res.json({ message }).end();
});

module.exports = router;
