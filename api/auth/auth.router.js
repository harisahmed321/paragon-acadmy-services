var express = require('express');
var router = express.Router();
const passport = require('passport');
const authCtrl = require('./auth.controller');

router.post('/login', authCtrl.login);

router.post('/register', authCtrl.registration);
router.post(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  authCtrl.changePassword
);

router.post('/forgot-password', authCtrl.forgotPasswordCodeGenerator);

router.post('/student-test-login', authCtrl.studentTestLogin);

module.exports = router;
