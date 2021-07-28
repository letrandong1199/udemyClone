const Router = require("express");
const feedbackService = require("../../business/services/feedback.service");
const authTeacher = require("../middleware/authTeacher.mdw");
const authUser = require("../middleware/authUser.mdw");
const router = Router();
router.post("/feedbacks", authUser, async (req, res) => {
  const message = await feedbackService.createOneFeedback(req);
  res.json({ message }).end();
});
router.put("/feedbacks/:id", authUser, async (req, res) => {
  const message = await feedbackService.updateOneFeedback(req);
  res.json({ message }).end();
});
router.delete("/feedbacks/:id", authUser, async (req, res) => {
  const message = await feedbackService.deleteOneFeedback(req);
  res.json({ message }).end();
});

module.exports = router;
