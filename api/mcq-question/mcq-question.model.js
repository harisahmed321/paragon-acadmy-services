const mySqlSequelize = require('../../config/mySqlDb');
const Sequelize = require('sequelize');
const MCQGroupModel = require('../mcq-group/mcq-group.model');

const MCQQuestion = mySqlSequelize.define('mCQQuestion', {
  mCQGroupId: {
    type: Sequelize.INTEGER,
    references: {
      model: MCQGroupModel,
      key: 'id',
    },
    allowNull: false,
  },
  section: { type: Sequelize.STRING, allowNull: false, defaultValue: 'others' },
  questionExpireInSec: {
    type: Sequelize.INTEGER,
    defaultValue: 60,
    allowNull: false,
  },
  sequence: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  title: { type: Sequelize.STRING(1000), allowNull: false },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
});

module.exports = MCQQuestion;
