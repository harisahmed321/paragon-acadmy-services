// const log4js = require('log4js');
const moment = require('moment');

const date = moment(new Date()).format('DD-MM-YYYY');

// log4js.configure({
//   appenders: { logging: { type: 'file', filename: `logs/${date}.log` } },
//   categories: { default: { appenders: ['logging'], level: 'ALL' } },
// });

// const logger = log4js.getLogger('SS');
// logger.isDebugEnabled = true;

error = (err, req, res) => {
  const log = `[${req.method}] ${req.url} [body] ${JSON.stringify(req.body)}
  [Message] ${err.message}`;
  // logger.error(log);
};

info = (logText) => {
  const log = `[Message] ${logText}`;
  // logger.info(log);
};

module.exports = { error, info };
