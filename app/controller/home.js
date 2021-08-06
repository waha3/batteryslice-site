'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg1';
    await ctx.render('../view/home.html');
  }
}

module.exports = HomeController;
