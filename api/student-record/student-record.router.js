var express = require('express');
var router = express.Router();
const passport = require('passport');
const studentRecordCtrl = require('./student-record.controller');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  studentRecordCtrl.create
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  studentRecordCtrl.update
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  studentRecordCtrl.readAll
);

router.get(
  '/:id(\\d+)/',
  passport.authenticate('jwt', { session: false }),
  studentRecordCtrl.read
);

// router.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   mCQQuestionCtrl.readAll
// );

module.exports = router;
