const createError = require('http-errors');
const tasksRepo = require('./task.db.repository');

const addTask = async task => {
  const createdTask = await tasksRepo.addTask(task);
  if (createdTask) return createdTask;
  throw new createError.BadRequest();
};

const getAll = async boardId => {
  return await tasksRepo.getAll(boardId);
};

const getTask = async (boardId, taskId) => {
  const task = await tasksRepo.getTask(boardId, taskId);
  if (task) return task;
  throw new createError.NotFound();
};

const updateTask = async (boardId, taskId, task) => {
  const updatedTask = await tasksRepo.updateTask(boardId, taskId, task);
  if (updatedTask) return updatedTask;
  throw new createError.BadRequest();
};

const deleteTask = async (boardId, taskId) => {
  return await tasksRepo.deleteTask(boardId, taskId);
};

const unassignTasks = userId => tasksRepo.unassignTasks(userId);

const deleteTasks = boardId => tasksRepo.deleteTasks(boardId);

module.exports = {
  addTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
  unassignTasks,
  deleteTasks
};
