const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res, next) => {
    try {
      const user = await usersService.addUser(req.body);
      res.status(200).json(User.toResponse(user));
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const user = await usersService.getUser(req.params.id);
      res.status(200).json(User.toResponse(user));
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const user = await usersService.updateUser({
        ...req.body,
        id: req.params.id
      });
      res.status(200).json(User.toResponse(user));
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    if (!req.params.id) res.status(400).send('Bad request');
    try {
      if (await usersService.deleteUser(req.params.id)) {
        res.status(204).send('The user has been deleted');
      }
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
