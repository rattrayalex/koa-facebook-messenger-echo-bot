import request from 'request';
import { d } from '../util';

async function requestp(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, response) => {
      if (!err) {
        return resolve(response);
      }
      return reject(err);
    });
  });
}

export async function sendMessage({ senderId, messageText }) {
  d({ senderId, messageText });
  if (!(senderId && messageText)) {
    throw new Error('senderId and messageText required');
  }

  return await requestp({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text: messageText },
    },
  });
}

export function getMessages(entries) {
  const messages = [];
  entries.forEach(entry => entry.messaging.forEach(event => {
    d({ event });
    if (event.message && event.message.text) {
      messages.push(event);
    }
  }));
  return messages;
}
