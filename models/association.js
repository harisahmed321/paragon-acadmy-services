const mySqlSequelize = require('../config/mySqlDb');
const models = mySqlSequelize.models;
// console.log(models);
// models.studentMCQAnswer.sync({ alter: true });

// MCQ Group
models.mCQGroup.hasMany(models.mCQQuestion, { foreignKey: 'mCQGroupId' });
models.mCQGroup.belongsToMany(models.user, {
  through: models.userMCQGroup,
});

// MCQ Question
models.mCQQuestion.hasMany(models.mCQOption, { foreignKey: 'mCQQuestionId' });

// USER MCQ Groups
models.userMCQGroup.belongsTo(models.user, {
  foreignKey: 'userId',
});

// Student Record
models.studentRecord.belongsTo(models.user, {
  foreignKey: 'userId',
});

models.studentRecord.hasMany(models.studentMCQAnswer, {
  foreignKey: 'studentRecordId',
});

// Student MCQ Answer
// models.studentMCQAnswer.belongsTo(models.mCQQuestion, {
//   foreignKey: 'mCQQuestionId',
// });
// models.studentMCQAnswer.belongsTo(models.mCQOption, {
//   foreignKey: 'mCQOptionId',
// });

// User
// models.user.hasMany(models.userMCQGroup, {
//   foreignKey: 'userId',
// });

// models.user.belongsToMany(models.mCQGroup, {
//   through: models.userMCQGroup,
// });

// // Hotel
// models.hotel.belongsTo(models.user);
// models.hotel.belongsTo(models.city);
// models.hotel.hasMany(models.hotel_image, { foreignKey: 'hotelId' });
// models.hotel.hasMany(models.hotel_room, { foreignKey: 'hotelId' });
// models.hotel.belongsToMany(models.amenity, {
//   through: models.hotel_amenity,
// });
// models.hotel.hasMany(models.rating_feedback, {
//   foreignKey: 'hotelId',
// });

// // Amenity
// models.amenity.belongsToMany(models.hotel, {
//   through: models.hotel_amenity,
// });

// // models.amenity.belongsToMany(models.hotel_room, {
// //   through: models.room_amenity,
// // });

// // Hotel Room
// models.hotel_room.belongsToMany(models.amenity, {
//   through: models.room_amenity,
// });

// // Bookings
// models.booking.belongsTo(models.hotel, {
//   foreignKey: 'hotelId',
// });
// models.booking.belongsTo(models.hotel_room, {
//   foreignKey: 'roomId',
// });
// models.booking.belongsTo(models.user, {
//   foreignKey: 'userId',
// });
// models.booking.hasMany(models.booking_status, {
//   foreignKey: 'bookingId',
// });

// // Device Info
// models.device_info.belongsTo(models.user, {
//   foreignKey: 'userId',
// });

// // Promo Code
// models.promo_code.hasMany(models.user_promo_code, {
//   foreignKey: 'promoCodeId',
// });

// // User Promo Code
// // Promo Code
// models.user_promo_code.belongsTo(models.promo_code, {
//   foreignKey: 'promoCodeId',
// });

// // Rating & Feedback
// models.rating_feedback.belongsTo(models.booking, {
//   foreignKey: 'bookingId',
// });
// models.rating_feedback.belongsTo(models.hotel, {
//   foreignKey: 'hotelId',
// });
// models.rating_feedback.belongsTo(models.user, {
//   foreignKey: 'userId',
// });

// models.hotel_room.hasMany(models.room_image, {
//   foreignKey: 'roomId',
// });

// models.room_image.belongsTo(models.hotel_room, {
//   foreignKey: 'roomId',
// });
