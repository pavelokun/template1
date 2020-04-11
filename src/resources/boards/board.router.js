const router = require('express').Router();
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    // validate
    const board = await boardsService.addBoard(req.body);
    if (board) {
      res.json(board);
    } else {
      res.status(400).send('Bad request');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).end('User not found');
    }
  })
  .put(async (req, res) => {
    try {
      const board = await boardsService.getById(req.params.id);
      const newBoard = await boardsService.updateBoard(board, req.body);
      res.json(newBoard);
    } catch (err) {
      res.status(400).end('Bad request');
    }
  })
  .delete(async (req, res, next) => {
    if (!req.params.id) res.status(400).send('Bad request');
    try {
      if (await boardsService.deleteBoard(req.params.id)) {
        res.status(204).send('The board has been deleted');
      }
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
