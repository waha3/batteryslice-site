'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/product', controller.home.product);
  router.get('/product/:id', controller.home.productDetail);
  router.get('/api/captcha', controller.home.captcha);
  router.post('/api/createorder', controller.home.createOrder);
};
