const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);

    if (tasks) {
      res.json(tasks.map(Task.toResponse));
    } else {
      res.status(404).end('Tasks not found');
    }
  })
  .post(async (req, res) => {
    // validate
    try {
      const body = await tasksService.addTask(req.body, req.params.boardId);
      res.status(200).json(Task.toResponse(body));
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getById(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(404).end('Task not found');
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.getById(
      req.params.boardId,
      req.params.taskId
    );
    const newTask = await tasksService.updateTask(task, req.body);
    res.json(Task.toResponse(newTask));
  })
  .delete(async (req, res) => {
    const task = await tasksService.getById(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      await tasksService.deleteTask(task);
      res.status(204).end('The task has been deleted');
    } else {
      res.status(404).end('Task not found');
    }
  });

module.exports = router;
