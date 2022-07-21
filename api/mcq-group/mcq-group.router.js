var express = require('express');
var router = express.Router();
const passport = require('passport');
const mcqCtrl = require('./mcq-group.controller');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  mcqCtrl.create
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  mcqCtrl.readAll
);

router.get(
  '/:id(\\d+)/',
  passport.authenticate('jwt', { session: false }),
  mcqCtrl.read
);

router.get(
  '/by-test-link/:testLink',
  // passport.authenticate('jwt', { session: false }),
  mcqCtrl.readByTestLink
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  mcqCtrl.update
);

router.delete(
  '/:id(\\d+)/',
  passport.authenticate('jwt', { session: false }),
  mcqCtrl.remove
);

module.exports = router;
