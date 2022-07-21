const User = require('./../user/user.model');
const { responseResult } = require('../../helpers/response');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { [Op.or]: [{ email: username }] },
    });
    if (!user) {
      const error = new Error('Username or password not matched');
      next(error);
      return;
    }

    const isPasswordValid = await User.prototype.isValidPassword(
      password,
      user
    );

    if (!isPasswordValid) {
      const error = new Error('Username or password not matched');
      next(error);
      return;
    }

    const token = generateToken(user);
    user.password = '';
    const result = { token, user };
    responseResult(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

registration = async (req, res, next) => {
  try {
    const user = await User.create(req.body, { userReq: req.body });
    if (!user) {
    }
    responseResult(res, {}, 'Account created successfully');
  } catch (error) {
    next(error);
  }
};

generateToken = (user) => {
  const body = { id: user.id };
  const token = jwt.sign({ user: body }, process.env.JWT_Secret_Key, {
    expiresIn: process.env.JWT_ExpiresIn,
  });
  return token;
};

changePassword = async (req, res, next) => {
  try {
    const { currentPassword, password } = req.body;
    const userId = process.currentUser.id;

    if (!password) {
      next(new Error('New password must not empty'));
      return;
    }

    if (currentPassword === password) {
      next(new Error('Current and new password must not be same'));
      return;
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      next(new Error('No user found!'));
      return;
    }
    const isPasswordValid = await User.prototype.isValidPassword(
      currentPassword,
      user
    );
    if (!isPasswordValid) {
      next(new Error('Password not matched'));
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    user.save();
    responseResult(res, {}, 'Password has been change successfully');
  } catch (error) {}
};

forgotPasswordCodeGenerator = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({
      where: { [Op.or]: [{ email: username }, { phoneNo: username }] },
      include: [{ model: UserRole }],
    });

    if (!user) {
      const error = new Error('email or phone number not matched');
      next(error);
      return;
    }

    await VerificationCodeModel.create({
      userId: user.id,
      type: 'FORGOT_PASSWORD',
    });

    responseResult(res, {}, 'Verification code has been sent');
  } catch (error) {}
};

studentTestLogin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, cnic, phoneNo, district } = req.body;

    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        cnic,
        phoneNo,
        district,
        password: '',
      });
    }

    const token = generateToken(user);
    user.password = '';
    const result = { token, user };
    responseResult(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  registration,
  changePassword,
  forgotPasswordCodeGenerator,
  studentTestLogin,
};
