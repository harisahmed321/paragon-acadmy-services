var express = require('express');
var router = express.Router();
const passport = require('passport');
const mCQOptionCtrl = require('./mcq-option.controller');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  mCQOptionCtrl.create
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  mCQOptionCtrl.readAll
);

router.delete(
  '/:id(\\d+)/',
  passport.authenticate('jwt', { session: false }),
  mCQOptionCtrl.remove
);

module.exports = router;
