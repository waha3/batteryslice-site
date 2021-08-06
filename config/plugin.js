'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }

//   handlebars: {
//     enable: true,
//     package: "egg-view-handlebars",
//   },
// };

exports.handlebars = {
  enable: true,
  package: 'egg-view-handlebars',
};

// exports.nunjucks = {
//   enable: true,
//   package: 'egg-view-nunjucks',
// };

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
