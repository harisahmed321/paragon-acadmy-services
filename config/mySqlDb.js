const Sequelize = require('sequelize');
const loggerJs = require('./../helpers/logger');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    const log = `Connection has been established successfully.`;
    console.log(log);
    loggerJs.info(log);
  })
  .catch((err) => {
    const log = `Unable to connect to the database: ${err}`;
    console.error(log);
    loggerJs.info(log);
  });

sequelize.sync();

module.exports = sequelize;
