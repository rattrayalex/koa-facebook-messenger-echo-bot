import Koa from 'koa';
import * as controllers from './controllers';
import routes from './routes';

const server = new Koa();

if (!process.env.PAGE_TOKEN) {
  throw new Error('Missing environment variable PAGE_TOKEN');
}
if (!process.env.VERIFY_TOKEN) {
  throw new Error('Missing environment variable VERIFY_TOKEN');
}

server.use(routes(controllers));
server.listen(process.env.PORT || 3000);
