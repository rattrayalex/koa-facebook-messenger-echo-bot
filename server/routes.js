import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';

const router = new Router();

export default function (controllers) {
  router.use(bodyparser());
  router.get('/', controllers.verify);
  router.post('/', controllers.respond);
  return router.routes();
}
