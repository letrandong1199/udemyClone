const request = require('request')
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Get user
async function getUser(sender_psid) {
    // Send the HTTP request to the Messenger Platform
    //let response = null;
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic`,
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                let response = JSON.parse(body);
                console.log('message sent!');
                resolve(response);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}

function handleTypingOn(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
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

function handleMarkSeen(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
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

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    await handleMarkSeen(sender_psid);
    await handleTypingOn(sender_psid);
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

function returnCategories() {
    let response = {
        "text": "Pick a category:",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Web development",
                "payload": "CATEGORIES",
            }, {
                "content_type": "text",
                "title": "Mobile development",
                "payload": "CATEGORIES",
            }
        ]
    };
    return response;
}

function handleListCategories(sender_psid) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await getUser(sender_psid)
            let response = returnCategories();

            await callSendAPI(sender_psid, response);
            await callSendAPI(sender_psid, response2);

            resolve('OK');
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

function returnTemplate() {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Welcome!",
                        "image_url": "https://www.studytienganh.vn/upload/2021/06/106293.jpg",
                        "subtitle": "What's next?",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "List categories",
                                "payload": "LIST_CATEGORIES"
                            }, {
                                "type": "postback",
                                "title": "Search",
                                "payload": "SEARCH"
                            }
                        ]
                    }
                ]
            }
        }
    };

    return response;
}

function handleGetStarted(sender_psid) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await getUser(sender_psid)
            let response = { "text": `Welcome ${user.first_name}.` };
            let response2 = returnTemplate();
            await callSendAPI(sender_psid, response);
            await callSendAPI(sender_psid, response2);

            resolve('OK');
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
};

function handleSendMessageAskingKeyword(sender_id) {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "What do you want to search?",
            "quick_replies": [
                {
                    "content_type": "text",
                }
            ]
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('quick message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

module.exports = { handleGetStarted, handleListCategories, sendMessageAskingKeyword };