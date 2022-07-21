var express = require('express');
var router = express.Router();
const passport = require('passport');
const mCQQuestionCtrl = require('./mcq-question.controller');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  mCQQuestionCtrl.create
);

router.get(
  '/:id(\\d+)/',
  passport.authenticate('jwt', { session: false }),
  mCQQuestionCtrl.read
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  mCQQuestionCtrl.update
);

router.delete(
  '/:id(\\d+)/',
  passport.authenticate('jwt', { session: false }),
  mCQQuestionCtrl.remove
);

module.exports = router;
