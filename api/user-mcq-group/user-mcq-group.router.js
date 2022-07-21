var express = require('express');
var router = express.Router();
const passport = require('passport');
const userMCQGroupCtrl = require('./user-mcq-group.controller');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  userMCQGroupCtrl.create
);

// router.get(
//   '/:id',
//   passport.authenticate('jwt', { session: false }),
//   userCtrl.read
// );

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userMCQGroupCtrl.readAll
);

module.exports = router;
