const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'silly',
  format: format.json(),
  transports: [
    new transports.Console(format.colorize()),
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error'
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/info.log'),
      level: 'info'
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../logs/exception.log')
    })
  ]
});

module.exports = logger;
