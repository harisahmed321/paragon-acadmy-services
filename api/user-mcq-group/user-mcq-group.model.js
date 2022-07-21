const Sequelize = require('sequelize');
const mySqlSequelize = require('./../../config/mySqlDb');
const UserModel = require('./../user/user.model');
const MCQGroupModel = require('./../mcq-group/mcq-group.model');

const UserMCQGroup = mySqlSequelize.define('userMCQGroup', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: UserModel,
      key: 'id',
    },
  },
  mCQGroupId: {
    type: Sequelize.INTEGER,
  },
  mCQGroupTitle: {
    type: Sequelize.STRING,
  },
  isEmailSent: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  testLink: { type: Sequelize.STRING },
  isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
});

module.exports = UserMCQGroup;
