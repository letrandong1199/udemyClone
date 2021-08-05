const chatbotService = require('../services/chatbot.service');
exports.homeGet = async (req, res) => {
    // const apiRes = await chatbotService.getCourseDetail(1);
    res.sendFile('index.html', { root: __dirname + '/../' });
};
