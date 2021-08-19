const redis = require('redis');
require("dotenv").config();

const client = redis.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASS,
})

client.on('error', function (error) {
    console.log("Error encountered: ", error);
})
client.on('connect', function () {
    console.log("Redis Connected");
})

module.exports = client;