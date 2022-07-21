const mySqlSequelize = require('../../config/mySqlDb');
const Sequelize = require('sequelize');
const btoa = require('btoa');

const MCQGroup = mySqlSequelize.define('mCQGroup', {
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING(1000), allowNull: false },
  testLink: { type: Sequelize.STRING },
  // questionExpireMints: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 30,
  //   allowNull: false,
  // },
  linkExpireAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: false,
  },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
});

MCQGroup.beforeCreate(async (model, options) => {
  model.testLink = btoa(+new Date()).slice(-7, -2);
});

module.exports = MCQGroup;
