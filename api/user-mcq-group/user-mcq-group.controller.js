const { responseResult } = require('../../helpers/response');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const UserModel = require('../user/user.model');
const MCQGroupModel = require('../mcq-group/mcq-group.model');
const UserMCQGroupModel = require('./user-mcq-group.model');
const emailHelper = require('./../../helpers/email');

create = async (req, res, next) => {
  try {
    const { mCQGroupId, usersIds } = req.body;
    const mCQGroup = await MCQGroupModel.findOne({ where: { id: mCQGroupId } });
    const existUsers = await UserMCQGroupModel.findAll({
      where: {
        [Op.and]: [{ userId: usersIds }, { mCQGroupId }],
      },
    });
    if (existUsers.length > 0) {
      existUsers.forEach((ele) => {
        const index = usersIds.findIndex((x) => x === ele.userId);
        if (index >= 0) {
          usersIds.splice(index, 1);
        }
      });
    }

    // Send Email
    const users = await UserModel.findAll({ where: { id: usersIds } });
    users.forEach((ele) => {
      const testLink = `${process.env.USER_TEST_LINK_URL}/${mCQGroup.testLink}`;
      const htmlBody = emailHelper.emailTestLinkTemplate(
        ele.firstName,
        ele.lastName,
        testLink
      );
      emailHelper.sendSingleEmail(
        ele.email,
        'Peragon Acadme Test Link',
        htmlBody,
        async (res) => {
          const userMCQGroup = {
            mCQGroupId,
            mCQGroupTitle: mCQGroup.title,
            userId: ele.id,
            testLink,
            isEmailSent: res,
          };
          await UserMCQGroupModel.create(userMCQGroup);
        }
      );
    });
    responseResult(res, {}, 'Invitation links sended');
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
    const userMCQGroups = await UserMCQGroupModel.findAndCountAll({
      offset: parseInt(offset || 0),
      limit: parseInt(limit || 10),
      distinct: true,
      where: { ...search },
      include: [
        {
          model: UserModel,
          attributes: ['id', 'email', 'firstName', 'lastName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    responseResult(res, userMCQGroups);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  readAll,
  // read, update, remove
};
