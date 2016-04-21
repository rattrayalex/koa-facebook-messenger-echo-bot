'use strict';
const d = require('./util').d;
console.warn(d);

function echo(event) {
  console.dir({ event: event }, d);
  if (!(event.message && event.message.text)) {
    console.error('no message text', event);
    return Promise.reject('no message text');
  }
  if (!(event.sender && event.sender.id)) {
    console.error('no sender id', event);
    return Promise.reject('no sender id');
  }
  const response = {
    messageText: event.message.text,
    senderId: event.sender.id
  };
  console.dir({ response: response }, d);
  return Promise.resolve(response);
}

module.exports = {
  respondToMessage: echo
};
