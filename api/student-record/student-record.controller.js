const { responseResult } = require('../../helpers/response');
const StudentRecordModel = require('./student-record.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const UserModel = require('../user/user.model');
const MCQGroupModel = require('../mcq-group/mcq-group.model');
const StudentMCQAnswerModel = require('../student-mcq-answer/student-mcq-answer.model');
const moment = require('moment');

create = async (req, res, next) => {
  try {
    const { userId, testLink } = req.body;
    let status = 'STARTED';

    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const mCQGroup = await MCQGroupModel.findOne({
      where: { testLink },
    });

    if (!mCQGroup) {
      throw new Error('Test not found');
    }

    const linkExpireAt = moment(mCQGroup.linkExpireAt).utc().format();
    const currentDateTime = moment().utc().format();
    console.log(currentDateTime, linkExpireAt);

    if (currentDateTime >= linkExpireAt) {
      status = 'EXPIRED';
    }

    let studentRecord = await StudentRecordModel.findOne({
      where: {
        [Op.and]: [{ userId }, { mCQGroupId: mCQGroup.id }],
      },
    });

    console.log('status', status);
    if (studentRecord) {
      if (studentRecord.status !== 'COMPLETED') {
        studentRecord.status = status;
        studentRecord.save();
      }
      responseResult(res, studentRecord, '');
      return;
    }

    studentRecord = await StudentRecordModel.create({
      userId,
      mCQGroupId: mCQGroup.id,
      mCQGroupTitle: mCQGroup.title,
      status,
    });
    responseResult(res, studentRecord, '');
  } catch (error) {
    next(error);
  }
};

update = async (req, res, next) => {
  try {
    const { userId, mCQGroupId, status } = req.body;

    // const user = await UserModel.findByPk(userId);
    // if (!user) {
    //   throw new Error('User not found');
    // }

    // const mCQGroup = await MCQGroupModel.findOne({
    //   where: { testLink },
    // });

    // if (!mCQGroup) {
    //   throw new Error('Test not found');
    // }
    // const linkExpireAt = moment(mCQGroup.linkExpireAt).format();
    // const currentDateTime = moment().format();

    // if (currentDateTime >= linkExpireAt) {
    //   throw new Error('Link expired');
    // }

    const studentRecord = await StudentRecordModel.findOne({
      where: {
        [Op.and]: [{ userId }, { mCQGroupId }],
      },
    });

    // if (studentRecord) {
    //   if (studentRecord.status === 'STARTED') {
    //     responseResult(
    //       res,
    //       { userId, mCQGroupId: mCQGroup.id },
    //       'Student test has been started'
    //     );
    //     return;
    //   }
    //   if (studentRecord.status !== 'COMPLETED') {
    //     throw new Error('Test has been completed');
    //   }
    //   if (studentRecord.status !== 'EXPIRED') {
    //     throw new Error('Test has been expired');
    //   }
    // }
    studentRecord.status = status;
    await studentRecord.save();

    responseResult(res, {}, 'Student Records Updated');
  } catch (error) {
    next(error);
  }
};

readAll = async (req, res, next) => {
  try {
    let userSearch = {};
    const { offset, limit, searchBy, searchValue } = req.query;
    let search = '';

    if (searchBy && searchValue) {
      switch (searchBy) {
        case 'id':
          search = { [searchBy]: searchValue };
          break;
        case 'name':
          userSearch = {
            firstName: { [Op.like]: `%${searchValue}%` },
          };
          break;
        case 'email':
          userSearch = {
            email: { [Op.like]: `%${searchValue}%` },
          };
          break;
        default:
          search = { [searchBy]: { [Op.like]: `%${searchValue}%` } };
          break;
      }
    }
    const models = await StudentRecordModel.findAndCountAll({
      offset: parseInt(offset || 0),
      limit: parseInt(limit || 10),
      distinct: true,
      where: { ...search },
      include: [
        {
          model: UserModel,
          where: { isActive: true, ...userSearch },
          attributes: ['firstName', 'lastName', 'email'],
        },
        {
          model: StudentMCQAnswerModel,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    responseResult(res, models);
  } catch (error) {
    next(error);
  }
};

read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await StudentRecordModel.findOne({
      where: { id },
      include: [
        {
          model: UserModel,
          where: { isActive: true },
        },
        {
          model: StudentMCQAnswerModel,
        },
      ],
    });
    responseResult(res, model);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  readAll,
  read,
  // read, update, remove
};
