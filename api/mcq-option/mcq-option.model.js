const mySqlSequelize = require('../../config/mySqlDb');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const MCQGroupModel = require('../mcq-group/mcq-group.model');
const MCQQuestionModel = require('../mcq-question/mcq-question.model');

const MCQOption = mySqlSequelize.define('mCQOption', {
  mCQGroupId: {
    type: Sequelize.INTEGER,
    references: {
      model: MCQGroupModel,
      key: 'id',
    },
    allowNull: false,
  },
  mCQQuestionId: {
    type: Sequelize.INTEGER,
    references: {
      model: MCQQuestionModel,
      key: 'id',
    },
    allowNull: false,
  },
  sequence: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  answer: { type: Sequelize.STRING, allowNull: false },
  isCorrectAnswer: { type: Sequelize.BOOLEAN, defaultValue: false },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
});

MCQOption.beforeCreate(async (model, options) => {
  if (model.isCorrectAnswer) {
    const mCQOptions = await MCQOption.findAll({
      where: {
        [Op.and]: [
          { mCQGroupId: model.mCQGroupId },
          { mCQQuestionId: model.mCQQuestionId },
          { isCorrectAnswer: true },
        ],
      },
    });
    mCQOptions.forEach(async (element) => {
      element.isCorrectAnswer = false;
      await element.save();
    });
    // if (mCQOptions && mCQOptions.length > 0) {
    //   throw new Error('Duplicate correct answer not added');
    // }
  }
  // model.testLink = uuidv4();
});

module.exports = MCQOption;
