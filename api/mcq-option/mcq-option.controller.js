const { responseResult } = require('../../helpers/response');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const MCQOptionModel = require('./mcq-option.model');

create = async (req, res, next) => {
  try {
    const {
      mCQGroupId,
      mCQQuestionId,
      sequence,
      answer,
      isCorrectAnswer,
    } = req.body;
    await MCQOptionModel.create({
      mCQGroupId,
      mCQQuestionId,
      sequence,
      answer,
      isCorrectAnswer,
    });
    responseResult(res, {}, 'MCQ option added successfully');
  } catch (error) {
    next(error);
  }
};

readAll = async (req, res, next) => {
  try {
    const { searchBy, searchValue } = req.query;
    let search = '';
    if (searchBy && searchValue) {
      search = { [searchBy]: { [Op.like]: `%${searchValue}%` } };
      if (searchBy === 'id' || searchBy === 'mCQQuestionId') {
        search = { [searchBy]: searchValue };
      }
    }
    const mCQOptions = await MCQOptionModel.findAll({
      where: { ...search },
      attributes: { exclude: ['isCorrectAnswer'] },
      order: [['sequence', 'ASC']],
    });
    responseResult(res, mCQOptions);
  } catch (error) {
    next(error);
  }
};

remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MCQOptionModel.destroy({ where: { id } });
    responseResult(res, {}, 'MCQ Option Removed');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  readAll,
  remove,
  // read, update, remove
};
