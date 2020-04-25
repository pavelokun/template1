const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const createError = require('http-errors');

const authorization = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.includes('Bearer')
    ) {
      throw new createError.Unauthorized();
    }

    const token = req.headers.authorization.slice(7);

    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        throw new createError.Unauthorized();
      }
      return next();
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = authorization;
