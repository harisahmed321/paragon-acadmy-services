var express = require('express');
var router = express.Router();
const passport = require('passport');
const studentMCQAnswerCtrl = require('./student-mcq-answer.controller');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  studentMCQAnswerCtrl.create
);

router.get(
  '/:studentRecordId/:mCQQuestionId',
  passport.authenticate('jwt', { session: false }),
  studentMCQAnswerCtrl.read
);

router.get(
  '/:studentRecordId',
  passport.authenticate('jwt', { session: false }),
  studentMCQAnswerCtrl.readAll
);

module.exports = router;
