'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const products = app.model.define(
    'products',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: INTEGER,
      name: STRING(30),
      product_image: STRING,
      created_at: DATE,
      updated_at: DATE,
      product_id: INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  return products;
};
