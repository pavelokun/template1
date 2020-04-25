const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.authenticateUser(
      req.body.login,
      req.body.password
    );
    res.status(200).send({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
