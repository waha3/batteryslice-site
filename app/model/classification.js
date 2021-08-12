'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const classification = app.model.define(
    'classification',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      class_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      freezeTableName: true,
    }
  );
  return classification;
};
