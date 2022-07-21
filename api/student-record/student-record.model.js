const mySqlSequelize = require('../../config/mySqlDb');
const Sequelize = require('sequelize');
const UserModel = require('../user/user.model');
const MCQGroupModel = require('../mcq-group/mcq-group.model');

const StudentRecord = mySqlSequelize.define('studentRecord', {
  userId: {
    type: Sequelize.UUID,
    references: {
      model: UserModel,
      key: 'id',
    },
    allowNull: false,
  },
  mCQGroupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  mCQGroupTitle: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['STARTED', 'COMPLETED', 'EXPIRED'],
    defaultValue: 'STARTED',
  },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
});

StudentRecord.beforeCreate(async (model, options) => {
  // const user = await UserModel.findByPk(model.userId);
  // if (!user) {
  //   throw new Error('User not found');
  // }
  // const mCQGroup = await MCQGroupModel.findOne({
  //   where: { testLink: options.testLink },
  // });
  // if (!mCQGroup) {
  //   throw new Error('Test not found');
  // }
  // const linkExpireAt = moment(mCQGroup.linkExpireAt).format();
  // const currentDateTime = moment().format();
  // if (currentDateTime >= linkExpireAt) {
  //   throw new Error('Link expired');
  // }
  // const studentRecord = await StudentRecord.findOne({
  //   where: {
  //     [Op.and]: [{ userId: model.userId }, { mCQGroupId: mCQGroup.id }],
  //   },
  // });
  // if (studentRecord) {
  //   if (studentRecord.status !== 'COMPLETED') {
  //     throw new Error('Test has been completed');
  //   }
  //   if (studentRecord.status !== 'EXPIRED') {
  //     throw new Error('Test has been expired');
  //   }
  // }
  // throw new Error('asd');
  // if (model.isCorrectAnswer) {
  //   const mCQOptions = await MCQOption.findAll({
  //     where: {
  //       [Op.and]: [
  //         { mCQGroupId: model.mCQGroupId },
  //         { mCQQuestionId: model.mCQQuestionId },
  //         { isCorrectAnswer: true },
  //       ],
  //     },
  //   });
  //   if (mCQOptions && mCQOptions.length > 0) {
  //     throw new Error('Duplicate correct answer not added');
  //   }
  // }
  // model.testLink = uuidv4();
});

module.exports = StudentRecord;
