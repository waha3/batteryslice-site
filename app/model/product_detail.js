'use strict';

module.exports = app => {
  const { INTEGER, DATE, TEXT } = app.Sequelize;
  const product_detail = app.model.define(
    'product_detail',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      desc: TEXT,
      product_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      freezeTableName: true,
    }
  );
  return product_detail;
};
