const bcrypt = require('bcrypt');
const { upperCapitalizeFirst } = require('../../helpers/helpers');
const mySqlSequelize = require('../../config/mySqlDb');
const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const User = mySqlSequelize.define('user', {
  id: { primaryKey: true, type: Sequelize.UUID },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    trim: true,
  },
  password: { type: Sequelize.STRING, allowNull: false, trim: true },
  cnic: {
    type: Sequelize.STRING,
    allowNull: true,
    trim: true,
  },
  role: {
    type: Sequelize.ENUM,
    values: ['ADMIN', 'USER'],
    defaultValue: 'USER',
  },
  phoneNo: {
    type: Sequelize.STRING,
    trim: true,
  },
  district: {
    type: Sequelize.STRING,
    trim: true,
  },
  isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
});

User.beforeCreate(async (user, options) => {
  if (user && user.email)
    await User.findOne({ where: { email: user.email } }).then((res) => {
      if (res) {
        throw new Error('Email already exist');
      }
    });
  user.id = uuidv4();
  user.firstName = user.firstName
    ? upperCapitalizeFirst(user.firstName)
    : user.firstName;
  user.lastName = user.lastName
    ? upperCapitalizeFirst(user.lastName)
    : user.lastName;
  user.email = user.email ? user.email.toLowerCase() : '';

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});

User.prototype.isValidPassword = async (password, user) => {
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = User;
