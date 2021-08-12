'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, TEXT } = Sequelize;
    await queryInterface.createTable('product_detail', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      desc: TEXT,
      product_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('product_detail');
  },
};
