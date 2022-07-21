const { responseResult } = require('../../helpers/response');
const UserModel = require('./user.model');
const StudentRecordModel = require('./../student-record/student-record.model');
const { Op } = require('sequelize');

read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    responseResult(res, user);
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
    const user = await UserModel.findAndCountAll({
      where: { ...search },
      distinct: true,
      attributes: { exclude: ['password'] },
      offset: parseInt(offset || 0),
      limit: parseInt(limit || 10),
      order: [['createdAt', 'DESC']],
    });
    responseResult(res, user);
  } catch (error) {
    next(error);
  }
};

update = async (req, res, next) => {
  try {
    const { id, role, email, firstName, lastName } = req.body;
    const user = await UserModel.findByPk(id);
    if (user) {
      user.role = role;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
    }
    responseResult(res, {}, 'User Updated');
  } catch (error) {
    next(error);
  }
};

remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await StudentRecordModel.destroy({ where: { userId: id } });
    await UserModel.destroy({ where: { id } });
    responseResult(res, {}, 'User Removed');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  read,
  readAll,
  update,
  remove,
  // readAll,
  // read, update, remove
};
