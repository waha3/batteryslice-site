'use strict';

module.exports = () => {
  const config = (exports = {});

  config.crawler = {
    immediate: true,
  };

  return {
    ...config,
  };
};
