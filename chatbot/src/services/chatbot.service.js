const request = require('request')
const axios = require('axios');
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
    return new Promise(function (resolve, reject) {
        try {
            axios.get('https://udemy-apis.herokuapp.com/api/category-controller/categories')
                .then(async apiResponse => {
                    let data = apiResponse.data.message.listAllResponse;
                    let listCategories = await Promise.all(data.map(category => {
                        return {
                            "content_type": "text",
                            "title": category.Name,
                            "payload": `CATEGORY-${category.Id}`,
                        }
                    }))
                    let response = {
                        "text": "Pick a category:",
                        "quick_replies": listCategories
                    };
                    resolve(response);
                })
        } catch (error) {
            reject(error);
        }
    })
}

function handleListCategories(sender_psid) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await returnCategories();
            await handleMarkSeen(sender_psid);
            await handleTypingOn(sender_psid);
            await callSendAPI(sender_psid, response);

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

function returnTemplateCourse(categoryId) {
    return new Promise((resolve, reject) => {
        try {
            axios.get(`${process.env.API_HOST}/course-controller/courses?category=${categoryId}&page=1&limit=10`)
                .then(async apiResponse => {
                    let data = apiResponse.data.message.listAllResponse;
                    let dataTemplate = await Promise.all(data.map(course => {
                        return {
                            "title": course.Title,
                            "image_url": course.Thumbnail_Small,
                            "subtitle": `${course.Price}$`,
                            "default_action": {
                                "type": "web_url",
                                "url": `https://udemy-client.herokuapp.com/course/detail${course.Id}`,
                                "webview_height_ratio": "tall",
                            },
                            "buttons": [
                                {
                                    "type": "web_url",
                                    "url": `https://udemy-client.herokuapp.com/course/detail${course.Id}`,
                                    "title": "View on Website"
                                }
                            ]
                        }
                    }))
                    dataTemplate.push({
                        "title": "What else?"
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `https://udemy-client.herokuapp.com/course?category=${categoryId}`,
                                "title": "Show more"
                            },
                            {
                                "type": "postback",
                                "payload": "RESTART",
                                "title": "Go back"
                            }
                        ]
                    })
                    console.log(data);
                    let response = {
                        "attachment": {
                            "type": "template",
                            "payload": {
                                "template_type": "generic",
                                "elements": dataTemplate
                            }
                        }
                    };
                    resolve(response);
                })
        } catch (error) {
            reject(error);
        }
    })
}

async function handleGetCoursesByCategory(sender_psid, categoryId) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = { "text": `List courses.` };
            let response2 = await returnTemplateCourse(categoryId);
            await callSendAPI(sender_psid, response);
            await callSendAPI(sender_psid, response2);

            resolve('OK');
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
};

function returnMessageAskingKeyword() {
    let response = {
        "text": "What do you want to search?",
        "quick_replies": [
            {
                "content_type": "user_email",
            }
        ]
    };
    return response;
};

function handleSearch(sender_psid) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = returnMessageAskingKeyword();

            await callSendAPI(sender_psid, response);

            resolve('OK');
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

module.exports = { handleGetStarted, handleListCategories, handleSearch, handleGetCoursesByCategory, returnTemplateCourse };