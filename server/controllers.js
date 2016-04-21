'use strict';
const querystring = require('querystring');
const request = require('request');
const bot = require('../bot');
const d = require('../util').d;

const PAGE_TOKEN = process.env.PAGE_TOKEN;

function requestp(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, response) => {
      if (!err) {
        return resolve(response);
      }
      reject(err);
    });
  });
}

function sendMessage(options) {
  if (options.senderId && options.messageText) {
    return requestp({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: PAGE_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: options.senderId },
        message: { text: options.messageText }
      }
    });
  }
  throw new Error('bot.respondToMessage needs to return senderId and messageText');
}

module.exports = {
  react: ctx => {
    console.dir({ body: ctx.request.body }, d);
    const promises = ctx.request.body.entry.map(entry => entry.messaging.map(
      event => bot.respondToMessage(event).then(sendMessage)
    ));
    console.dir({ promises: promises }, d);

    Promise.all(promises)
      .then(_ => ctx.status = 200)
      .catch(_ => ctx.status = 500);
  },
  verify: ctx => {
    const query = querystring.parse(ctx.request.url);
    if (query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
      ctx.body = query['hub.challenge'];
    } else {
      ctx.body = 'Bad verify_token';
    }
  }
};
