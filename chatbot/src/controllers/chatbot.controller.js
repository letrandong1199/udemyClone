const request = require('request')
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const chatbotService = require('../services/chatbot.service');

// Handles messages events
async function handleMessage(sender_psid, received_message) {
    let response;

    // Check if the message contains text
    if (received_message.text) {
        console.log(received_message)
        if (received_message.quick_replies && received_message.quick_replies.payload) {
            if (message.quick_reply.payload !== " ") {
                console.log(message.quick_replies.payload);
            }
            const prefix = message.quick_reply.payload.split("-");
            if (message.quick_reply.prefix[0] === "CATEGORY") {
                await chatbotService.handleGetCoursesByCategory(prefix[1]);
            }
        }
        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;
    let prefix = payload.split('-')
    console.log('pay', payload);
    // Set the response based on the postback payload
    if (payload === 'LIST_CATEGORIES') {
        await chatbotService.handleListCategories(sender_psid);
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    } else if (payload === 'GET_STARTED' || payload === 'RESTART') {
        await chatbotService.handleGetStarted(sender_psid);
    } else if (payload === 'SEARCH') {
        await chatbotService.handleSearch(sender_psid);
    } else if (prefix[0] === 'CATEGORY') {
        await chatbotService.handleGetCoursesByCategory(prefix[1]);
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

exports.chatbotGet = (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

};

exports.chatbotPost = (req, res) => {

    // Your verify token. Should be a random string.
    //let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};