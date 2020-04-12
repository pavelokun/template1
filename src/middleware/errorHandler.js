const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.error(
    `Error: status - ${err.statusCode || 500}, message - ${err.message ||
      'Internal Server Error'}`
  );

  res
    .status(err.statusCode || 500)
    .send(err.message || 'Internal Server Error');
};

module.exports = errorHandler;
