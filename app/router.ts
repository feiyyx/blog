import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/about', controller.home.about);
  router.get('/translate', controller.home.translate);
  router.get('/api/translate', controller.api.translate);
  router.resources('live', '/article/live', controller.liveArticle);
  router.resources('tech', '/article/tech', controller.techArticle);
  router.resources('article', '/article', controller.article);
  router.resources('home', '/', controller.home);
};
