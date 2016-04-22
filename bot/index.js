import { d } from '../util';

function echo(event) {
  return {
    messageText: event.message.text,
    senderId: event.sender.id,
  };
}

export function respondToMessage(event) {
  d({ event });
  if (!(event.message && event.message.text)) {
    return Promise.reject('no message text');
  }
  if (!(event.sender && event.sender.id)) {
    return Promise.reject('no sender id');
  }

  const response = echo(event);
  d({ response });
  return Promise.resolve(response);
}
