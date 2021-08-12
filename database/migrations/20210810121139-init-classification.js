'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('classification', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      class_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('classification');
  },
};
