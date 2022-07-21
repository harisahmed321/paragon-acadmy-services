const { responseResult } = require('../../helpers/response');
const StudentMCQAnswerModel = require('./student-mcq-answer.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const UserModel = require('../user/user.model');
// const MCQGroupModel = require('../mcq-group/mcq-group.model');
// const moment = require('moment');
// const MCQQuestionModel = require('../mcq-question/mcq-question.model');
// const MCQOptionModel = require('../mcq-option/mcq-option.model');

create = async (req, res, next) => {
  try {
    const {
      studentRecordId,
      mCQQuestionId,
      mCQQuestionSection,
      mCQQuestionTitle,
      mCQOptionId,
      mCQOptionTitle,
    } = req.body;

    const studentMCQAnswerFound = await StudentMCQAnswerModel.findOne({
      where: {
        [Op.and]: [{ studentRecordId }, { mCQQuestionId }],
      },
    });
    if (studentMCQAnswerFound) {
      responseResult(res, {}, '');
      return;
    }
    await StudentMCQAnswerModel.create({
      studentRecordId,
      mCQQuestionId,
      mCQQuestionSection: mCQQuestionSection.toLowerCase(),
      mCQQuestionTitle,
      mCQOptionId,
      mCQOptionTitle,
    });
    responseResult(res, {}, '');
  } catch (error) {
    next(error);
  }
};

read = async (req, res, next) => {
  try {
    const { studentRecordId, mCQQuestionId } = req.params;
    const studentMCQAnswerFound = await StudentMCQAnswerModel.findOne({
      where: {
        [Op.and]: [{ studentRecordId }, { mCQQuestionId }],
      },
    });
    if (studentMCQAnswerFound) {
      next(new Error('Answer already submitted'));
      return;
    }
    responseResult(res, {}, 'Answer not exist');
  } catch (error) {
    next(error);
  }
};

readAll = async (req, res, next) => {
  try {
    const { studentRecordId } = req.params;
    const StudentMCQAnswers = await StudentMCQAnswerModel.findAll({
      where: {
        studentRecordId,
      },
      order: [['mCQQuestionSection', 'ASC']],
    });
    responseResult(res, StudentMCQAnswers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  read,
  readAll,
  // read, update, remove
};
