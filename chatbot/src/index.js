const express = require('express');
require('dotenv').config();

const app = express();
const routes = require('./routes');
app.use(express.json());

app.use('/', routes);

let port = process.env.PORT || 3033;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});