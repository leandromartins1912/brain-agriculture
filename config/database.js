const { Sequelize } = require('sequelize');

const isTestEnvironment = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize(isTestEnvironment ? 'brain_agriculture' : 'brain_agriculture', 'user', 'password', {
  host: process.env.DB_HOST || 'db',
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432
});

module.exports = sequelize;
