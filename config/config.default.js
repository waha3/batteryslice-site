/* eslint-disable arrow-parens */
/* eslint valid-jsdoc: "off" */

'use strict';

// const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1623665454371_5534';

  // add your middleware config here
  config.middleware = [];

  // config.view = {
  //   defaultViewEngine: 'handlebars',
  //   defaultExtension: '.html',
  //   mapping: {
  //     '.hbs': 'handlebars',
  //     '.html': 'handlebars',
  //   },
  // };

  // config.handlebars = {
  //   partialsPath: path.join(appInfo.baseDir, 'app/view/partials'),
  //   knownHelpersOnly: false,
  // };

  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    mapping: {
      '.tpl': 'nunjucks',
      '.nj': 'nunjucks',
      '.html': 'nunjucks',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'battery_site',
  };

  return {
    ...config,
  };
};
