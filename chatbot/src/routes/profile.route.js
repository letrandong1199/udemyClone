const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile.controller');

profileRouter.get('/', profileController.profileGet)

profileRouter.post('/', profileController.profilePost);

module.exports = profileRouter;