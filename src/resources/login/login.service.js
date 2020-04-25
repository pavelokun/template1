const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const createError = require('http-errors');
const userService = require('../users/user.service');

const authenticateUser = async (login, password) => {
  if (!login || !password) {
    throw new createError.BadRequest();
  }
  const user = await userService.getUserByLogin(login);
  if (!user) throw new createError.Forbidden();

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new createError.Forbidden();

  const payload = { userId: user._id, login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '10m' });
  return token;
};

module.exports = { authenticateUser };
