class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const responseResult = (res, result = {}, message = '') => {
  res.status(200).send({ message, result });
};

module.exports = {
  ErrorHandler,
  responseResult,
};
