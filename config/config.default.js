'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.keys = appInfo.name + '_1623665454371_5534';

  config.middleware = [];

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
