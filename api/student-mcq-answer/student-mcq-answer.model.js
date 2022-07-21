const mySqlSequelize = require('../../config/mySqlDb');
const Sequelize = require('sequelize');
const StudentRecordModel = require('../student-record/student-record.model');
const MCQOptionModel = require('../mcq-option/mcq-option.model');

const StudentMCQAnswer = mySqlSequelize.define('studentMCQAnswer', {
  studentRecordId: {
    type: Sequelize.INTEGER,
    references: {
      model: StudentRecordModel,
      key: 'id',
    },
    allowNull: false,
  },
  mCQQuestionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  mCQQuestionSection: {
    type: Sequelize.STRING,
  },
  mCQQuestionTitle: {
    type: Sequelize.STRING(1000),
  },
  mCQOptionId: {
    type: Sequelize.INTEGER,
  },
  mCQOptionTitle: {
    type: Sequelize.STRING,
  },
  isCorrectAnswer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
});

StudentMCQAnswer.beforeCreate(async (model, options) => {
  const mCQOption = await MCQOptionModel.findByPk(model.mCQOptionId);
  if (mCQOption) {
    model.isCorrectAnswer = mCQOption.isCorrectAnswer;
  } else {
    model.isCorrectAnswer = false;
  }
});

module.exports = StudentMCQAnswer;
