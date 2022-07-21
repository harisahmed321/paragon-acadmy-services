const { responseResult } = require('../../helpers/response');
const MCQQuestionModel = require('./mcq-question.model');
const MCQOptionModel = require('./../mcq-option/mcq-option.model');

create = async (req, res, next) => {
  try {
    const {
      mCQGroupId,
      sequence,
      section,
      questionExpireInSec,
      title,
    } = req.body;
    await MCQQuestionModel.create({
      mCQGroupId,
      sequence,
      section: section.toLowerCase(),
      questionExpireInSec,
      title,
    });
    responseResult(res, {}, 'MCQ question created successfully');
  } catch (error) {
    next(error);
  }
};

read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mCQQuestion = await MCQQuestionModel.findOne({
      where: { id },
      include: [{ model: MCQOptionModel }],
      order: [[{ model: MCQOptionModel }, 'sequence', 'ASC']],
    });

    responseResult(res, mCQQuestion);
  } catch (error) {
    next(error);
  }
};

update = async (req, res, next) => {
  try {
    const {
      id,
      mCQGroupId,
      sequence,
      section,
      questionExpireInSec,
      title,
    } = req.body;
    const model = await MCQQuestionModel.findByPk(id);
    if (model) {
      model.mCQGroupId = mCQGroupId;
      model.sequence = sequence;
      model.section = section.toLowerCase();
      model.questionExpireInSec = questionExpireInSec;
      model.title = title;
      await model.save();
    }
    responseResult(res, {}, 'MCQ Question Updated');
  } catch (error) {
    next(error);
  }
};

remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MCQOptionModel.destroy({ where: { mCQQuestionId: id } });
    await MCQQuestionModel.destroy({ where: { id } });
    responseResult(res, {}, 'MCQ Question Removed');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
};
