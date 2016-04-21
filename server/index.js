'use strict';
const Koa = require('koa');
const server = new Koa();

if (!process.env.PAGE_TOKEN) {
  throw new Error('Missing environment variable PAGE_TOKEN');
}
if (!process.env.VERIFY_TOKEN) {
  throw new Error('Missing environment variable VERIFY_TOKEN');
}

const controllers = require('./controllers');
const routes = require('./routes')(controllers);

server.use(routes);
server.listen(process.env.PORT || 3000);
