'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { page = 1 } = ctx.query;
    const limit = 16;

    const list = await ctx.model.Products.findAll({
      raw: true,
    });
    const sortedList = list
      .sort(val => {
        if (val.type === 2 || val.type === 8) {
          return -1;
        }
        return 0;
      })
      .slice((page - 1) * limit, page * limit);

    const count = await ctx.model.Products.count();
    await ctx.render('../view/home.html', {
      list: sortedList,
      pageSum: Math.ceil(count / limit),
      page: Number(page),
    });
  }

  async product() {
    const { ctx } = this;
    const list = await ctx.model.Classification.findAll({
      order: [['class_id', 'ASC']],
      raw: true,
    });
    const listData = await ctx.model.Products.findAll({
      order: [['type', 'ASC']],
      raw: true,
    });

    const formatedData = listData.reduce((acc, val) => {
      if (acc[val.type]) {
        acc[val.type].push(val);
      } else {
        acc[val.type] = [val];
      }
      return acc;
    }, {});

    await ctx.render('../view/product.html', {
      list,
      listData: formatedData,
    });
  }

  async productDetail() {
    const { ctx } = this;
    const { id } = ctx.params;

    const data = await ctx.model.ProductDetail.findOne({
      where: {
        product_id: id,
      },
      raw: true,
    });

    const product = await ctx.model.Products.findOne({
      where: {
        product_id: id,
      },
      raw: true,
    });
    const classInfo = await ctx.model.Classification.findOne({
      where: {
        class_id: product.type,
      },
      raw: true,
    });

    data.type = classInfo.name;
    data.name = product.name;
    await ctx.render('../view/product_detail.html', { detail: data });
  }

  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create();
    ctx.session.captcha = captcha.text;
    ctx.body = captcha.data;
    ctx.status = 200;
  }

  async createOrder() {
    const { ctx } = this;
    const data = ctx.request.body;
    const captcha = ctx.session.captcha;

    if (
      data.vercode_data &&
      captcha &&
      data.vercode_data.toLocaleLowerCase() === captcha.toLocaleLowerCase()
    ) {
      ctx.body = {
        code: 200,
        message: '订单提交成功',
      };
      ctx.session.captcha = null;

      const map = {
        sum: '数量',
        contact: '联系人',
        address: '地址',
        phone: '电话',
        email: '邮件',
        wechat: '微信号',
      };
      ctx.service.mail.send(data, map);
    } else {
      ctx.body = {
        code: 1,
        message: '验证码错误',
      };
    }
    ctx.status = 200;
  }
}

module.exports = HomeController;
