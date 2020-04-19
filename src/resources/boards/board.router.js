const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res, next) => {
    try {
      const board = await boardsService.addBoard(req.body);
      res.status(200).json(Board.toResponse(board));
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const board = await boardsService.getBoard(req.params.id);
      res.status(200).json(Board.toResponse(board));
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const board = await boardsService.updateBoard(req.body);
      res.status(200).json(Board.toResponse(board));
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      if (await boardsService.deleteBoard(req.params.id)) {
        res.status(204).send('The board has been deleted');
      } else {
        res.status(404).send('Not found');
      }
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
