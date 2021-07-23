const express = require('express');
require('dotenv').config();

const app = express();
const chatbot = require('./routes/chatbot.route');
const profile = require('./routes/profile.route');
const home = require('./routes/home.route');
app.use(express.json());

app.use('/', home);
app.use('/', chatbot);
app.use('/profile', profile);

let port = process.env.PORT || 3033;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});