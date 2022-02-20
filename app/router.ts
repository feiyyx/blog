import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/about', controller.home.about);
  router.resources('article', '/article', controller.article);
  router.resources('home', '/', controller.home);
};
