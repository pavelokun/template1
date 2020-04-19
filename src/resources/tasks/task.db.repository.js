const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });

const addTask = async task => Task.create(task);

const getTask = async (boardId, taskId) => {
  return await Task.findOne({ _id: taskId, boardId });
};

const updateTask = async (boardId, taskId, task) => {
  return (await Task.updateOne({ _id: taskId, boardId }, task)).ok
    ? task
    : null;
};

const deleteTask = async (boardId, taskId) => {
  return (await Task.deleteOne({ _id: taskId, boardId })).ok;
};

const unassignTasks = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

const deleteTasks = async boardId => {
  await Task.deleteMany({ boardId });
};

module.exports = {
  addTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
  unassignTasks,
  deleteTasks
};
