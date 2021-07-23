const request = require('request')
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

exports.profileGet = (req, res) => {
    res.sendFile('profile.html', { root: __dirname + '/../' })
};

exports.profilePost = async (req, res) => {
    console.log('Hello');
    // Construct the message body
    let request_body = {
        'get_started': { 'payload': 'GET_STARTED' },
        'whitelisted_domains': ['https://udemy-chatbots.herokuapp.com/', 'https://udemy-client.herokuapp.com/'],
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Talk to an agent",
                        "payload": "CARE_HELP"
                    },
                    {
                        "type": "postback",
                        "title": "Outfit suggestions",
                        "payload": "CURATION"
                    },
                    {
                        "type": "web_url",
                        "title": "Learn now",
                        "url": "https://udemy-client.herokuapp.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ]

    }
    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/v10.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('Sussess.')
        } else {
            console.error("Error: " + err);
        }
    });
    return res.send('Sussess');
}