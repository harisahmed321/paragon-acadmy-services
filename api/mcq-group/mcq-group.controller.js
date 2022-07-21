const { responseResult } = require('../../helpers/response');
const MCQGroupModel = require('./mcq-group.model');
const MCQQuestionModel = require('./../mcq-question/mcq-question.model');
const MCQOptionModel = require('./../mcq-option/mcq-option.model');
const { Op } = require('sequelize');
const moment = require('moment');
// create, read, update, remove

create = async (req, res, next) => {
  try {
    const { title, description, linkExpireAt } = req.body;
    await MCQGroupModel.create({
      title,
      description,
      linkExpireAt: linkExpireAt ? moment(linkExpireAt).utc().format() : '',
    });
    responseResult(res, {}, 'MCQ group created successfully');
  } catch (error) {
    next(error);
  }
};

readAll = async (req, res, next) => {
  try {
    const { offset, limit, searchBy, searchValue } = req.query;
    let search = '';
    if (searchBy && searchValue) {
      search = { [searchBy]: { [Op.like]: `%${searchValue}%` } };
      if (searchBy === 'id') {
        search = { [searchBy]: searchValue };
      }
    }
    let mCQGroups = await MCQGroupModel.findAndCountAll({
      offset: parseInt(offset || 0),
      limit: parseInt(limit || 10),
      distinct: true,
      where: { ...search },
      order: [['createdAt', 'DESC']],
    });

    if (mCQGroups.count > 0) {
      rows = JSON.parse(JSON.stringify(mCQGroups.rows));
      rows.forEach((element) => {
        element.testLink = `${process.env.USER_TEST_LINK_URL}/${element.testLink}`;
      });
      mCQGroups.rows = rows;
    }
    responseResult(res, mCQGroups);
  } catch (error) {
    next(error);
  }
};

read = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mCQGroups = await MCQGroupModel.findOne({
      where: { id },
      include: [{ model: MCQQuestionModel }],
      order: [
        ['createdAt', 'DESC'],
        [{ model: MCQQuestionModel }, 'section', 'ASC'],
        [{ model: MCQQuestionModel }, 'sequence', 'ASC'],
      ],
    });

    responseResult(res, mCQGroups);
  } catch (error) {
    next(error);
  }
};

readByTestLink = async (req, res, next) => {
  try {
    const { testLink } = req.params;
    let mCQGroups = await MCQGroupModel.findOne({
      where: { testLink },
      include: [
        {
          model: MCQQuestionModel,
          include: [
            {
              model: MCQOptionModel,
              where: { isActive: true },
              attributes: ['id'],
            },
          ],
        },
      ],
      order: [
        [{ model: MCQQuestionModel }, 'section', 'ASC'],
        [{ model: MCQQuestionModel }, 'sequence', 'ASC'],
      ],
    });

    responseResult(res, mCQGroups);
  } catch (error) {
    next(error);
  }
};

update = async (req, res, next) => {
  try {
    const { id, title, description, linkExpireAt } = req.body;
    const model = await MCQGroupModel.findByPk(id);
    if (model) {
      model.title = title;
      model.description = description;
      model.linkExpireAt = moment(linkExpireAt).utc().format();
      await model.save();
    }
    responseResult(res, {}, 'MCQ Group Updated');
  } catch (error) {
    next(error);
  }
};

remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MCQGroupModel.destroy({ where: { id } });
    responseResult(res, {}, 'MCQ Group Removed');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  readAll,
  read,
  readByTestLink,
  update,
  remove,
  // read, update, remove
};
