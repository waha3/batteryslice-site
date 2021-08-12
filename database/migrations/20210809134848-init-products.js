'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('products', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      product_image: STRING,
      type: INTEGER,
      created_at: DATE,
      updated_at: DATE,
      product_id: INTEGER,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('products');
  },
};
