import querystring from 'querystring';
import bot from '../bot';
import { getMessages, sendMessage } from '../messenger';
import { d } from '../util';


export const respond = (ctx) => {
  const { body } = ctx.request;
  d({ body });
  const promises = getMessages(body.entry)
    .map(msg => bot.respondToMessage(msg).then(sendMessage));
  d({ promises });

  Promise.all(promises)
    .then(() => { ctx.status = 200; })
    .catch(() => { ctx.status = 500; });
};

export const verify = (ctx) => {
  const query = querystring.parse(ctx.request.url);
  if (query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    ctx.body = query['hub.challenge'];
  } else {
    ctx.body = 'Bad verify_token';
  }
};
