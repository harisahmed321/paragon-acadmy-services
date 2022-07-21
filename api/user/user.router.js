var express = require('express');
var router = express.Router();
const passport = require('passport');
const userCtrl = require('./user.controller');

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userCtrl.read
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userCtrl.readAll
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  userCtrl.update
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userCtrl.remove
);

module.exports = router;
