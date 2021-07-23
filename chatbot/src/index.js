const express = require('express');
require('dotenv').config();

const app = express();
const chatbot = require('./routes/chatbot.route');
const setupProfile = require('./routes/setupProfile.route');
app.use(express.json());

app.use('/', chatbot);
app.use('/setup-profile', setupProfile);

let port = process.env.PORT || 3033;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});