var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const loggerJs = require('./helpers/logger');
var cors = require('cors');

// Helpers
// const { handleError } = require('./helpers/response');
require('dotenv').config({ path: '.env.prod' });
require('./auth/auth');
require('./config/mySqlDb');
const email = require('./helpers/email');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const authRouter = require('./api/auth/auth.router');
app.use('/api/auth', authRouter);

const userRouter = require('./api/user/user.router');
app.use('/api/user', userRouter);

const mcqRouter = require('./api/mcq-group/mcq-group.router');
app.use('/api/mcq-group', mcqRouter);

const mcqQuestionRouter = require('./api/mcq-question/mcq-question.router');
app.use('/api/mcq-question', mcqQuestionRouter);

const mcqOptionRouter = require('./api/mcq-option/mcq-option.router');
app.use('/api/mcq-option', mcqOptionRouter);

const studentRecordRouter = require('./api/student-record/student-record.router');
app.use('/api/student-record', studentRecordRouter);

const studentMCQAnswerRouter = require('./api/student-mcq-answer/student-mcq-answer.router');
app.use('/api/student-mcq-answer', studentMCQAnswerRouter);

const userMCQGroupRouter = require('./api/user-mcq-group/user-mcq-group.router');
app.use('/api/user-mcq-group', userMCQGroupRouter);

app.get('/test', function (req, res) {
  res.json(true);
});

// // Must be in last
var association = require('./models/association');
// Routes
// app.use('/', indexRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/user', usersRouter);
// app.use('/api/verification', verificationCodeRoute);
// app.use('/api/deviceInfo', deviceInfo);
// app.use('/api/user-role', userRole);
// app.use('/api/city', city);
// app.use('/api/amenity', amenity);
// app.use('/api/hotel', hotel);
// app.use('/api/hotel-room', hotelRoom);
// app.use('/api/booking', booking);
// app.use('/api/booking-status', bookingStatus);
// app.use('/api/config', config);
// app.use('/api/app-notification', appNotification);
// app.use('/api/promo-code', promoCode);
// app.use('/api/user-promo-code', userPromoCode);
// app.use('/api/rating-feedback', ratingFeedback);
// app.use('/api/quick-answer', quickAnswer);
// app.use('/api/home', home);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

// error handler
app.use(function (err, req, res, next) {
  loggerJs.error(err, req, res);
  console.log(err);
  let errorMessage = '';
  if (err && err.message === 'Validation error') {
    errorMessage = err.errors[0].message;
  } else {
    if (err && err.message) {
      errorMessage = err.message;
    } else {
      errorMessage = 'Something went wrong';
    }
  }
  res.status(400).send({
    message: errorMessage,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server running at http://localhost:${process.env.PORT || 8080}/`
  );
});

module.exports = app;
