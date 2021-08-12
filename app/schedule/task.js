'use strict';

const Subscription = require('egg').Subscription;
const getProducts = require('../crawler/index.js');

class ManualTask extends Subscription {
  static get schedule() {
    return {
      interval: '1y',
      type: 'all',
      immediate: false,
      disable: false,
    };
  }

  async subscribe() {
    const { ctx } = this;
    const { productClassList, productDetail, descList } = await getProducts();

    // 清空表
    ctx.model.Classification.destroy({
      where: {},
      truncate: true,
    });
    ctx.model.Products.destroy({
      where: {},
      truncate: true,
    });
    ctx.model.ProductDetail.destroy({
      where: {},
      truncate: true,
    });

    productClassList.forEach(async (item, index) => {
      await ctx.model.Classification.create({
        name: item,
        class_id: index + 1,
      });
    });

    productDetail.forEach((item, index) => {
      item.forEach(async child => {
        await ctx.model.Products.create({
          name: child.title,
          product_image: child.imgUrl,
          type: index + 1,
          product_id: child.productId,
        });
      });
    });

    descList.forEach(async item => {
      await ctx.model.ProductDetail.create({
        desc: item.p.filter(val => !!val).join('@@@'),
        product_id: item.productId,
      });
    });
  }
}

module.exports = ManualTask;
