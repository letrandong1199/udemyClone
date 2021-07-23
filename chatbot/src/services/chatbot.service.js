const request = require('request')
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Get user
async function getUser(sender_psid) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    // Send the HTTP request to the Messenger Platform
    //let response = null;
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic`,
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
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

function handleGetStarted(sender_psid) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await getUser(sender_psid)
            let response = { "text": `Welcome ${user.first_name}` };
            await callSendAPI(sender_psid, response);
            resolve('OK');
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

module.exports = { handleGetStarted };