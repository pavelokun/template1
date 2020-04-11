const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = async id => {
  const tasks = await tasksRepo.getAll();
  const filteredTasks = tasks.filter(task => task.boardId === id);
  return filteredTasks;
};

const getById = async (boardId, id) => {
  const tasks = await getAll(boardId);
  const task = tasks.find(item => item.id === id);
  return task;
};

const addTask = async (body, boardId) => {
  const newTask = new Task({
    ...body,
    boardId
  });
  await tasksRepo.addTask(newTask);
  return newTask;
};

const updateTask = async (task, body) => {
  const newTask = { ...task, ...body };
  await tasksRepo.updateTask(task, newTask);
  return newTask;
};

const unassign = id => tasksRepo.unassign(id);

const deleteTasksById = id => tasksRepo.deleteTasksById(id);

const deleteTask = async task => tasksRepo.deleteTask(task);

module.exports = {
  getAll,
  addTask,
  getById,
  updateTask,
  deleteTask,
  unassign,
  deleteTasksById
};
