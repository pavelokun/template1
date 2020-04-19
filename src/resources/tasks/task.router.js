const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router
  .route('/:boardId/tasks')
  .get(async (req, res, next) => {
    try {
      const tasks = await tasksService.getAll(req.params.boardId);
      res.json(tasks.map(Task.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const body = await tasksService.addTask({
        ...req.body,
        boardId: req.params.boardId
      });
      res.status(200).json(Task.toResponse(body));
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.getTask(
        req.params.boardId,
        req.params.taskId
      );
      res.status(200).json(Task.toResponse(task));
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const task = await tasksService.updateTask(
        req.params.boardId,
        req.params.taskId,
        req.body
      );
      res.status(200).json(Task.toResponse(task));
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    if (!req.params.taskId) res.status(400).send('Bad request');
    try {
      const result = await tasksService.deleteTask(
        req.params.boardId,
        req.params.taskId
      );
      if (result) {
        res.status(204).end('The task has been deleted');
      } else {
        res.status(404).end('Task not found');
      }
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
