const express = require('express');

const router = express.Router();
const chatbotController = require('../controllers/chatbot.controller');


router.post('/webhook', chatbotController.chatbotGet);

router.get('/webhook', chatbotController.chatbotPost);

module.exports = router;