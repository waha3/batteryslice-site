'use strict';

module.exports = () => {
  const config = (exports = {});

  config.crawler = {
    immediate: false,
  };

  return {
    ...config,
  };
};
