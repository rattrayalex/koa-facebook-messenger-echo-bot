import querystring from 'querystring';
import { respondToMessage } from '../bot';
import { getMessages, sendMessage } from '../messenger';
import { d } from '../util';


export async function respond(ctx) {
  const { body } = ctx.request;
  d({ body });
  const messages = getMessages(body.entry);
  d({ messages });
  const responses = await Promise.all(messages.map(respondToMessage));
  d({ responses });
  await Promise.all(responses.map(sendMessage));
  ctx.status = 200;
}

export async function verify(ctx) {
  const query = querystring.parse(ctx.request.url);
  if (query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    ctx.body = query['hub.challenge'];
  } else {
    ctx.body = 'Bad verify_token';
  }
}
