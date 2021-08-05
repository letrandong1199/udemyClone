const chatbotService = require('../services/chatbot.service');
exports.homeGet = async (req, res) => {
    const apiRes = chatbotService.returnCategories();
    console.log('inconto', apiRes);
    res.sendFile('index.html', { root: __dirname + '/../' });
};
