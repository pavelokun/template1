const Task = require('./task.model');

let tasks = [new Task({})];

const getAll = async () => {
  return tasks;
};

const addTask = async task => tasks.push(task);

const updateTask = async (task, newTask) => {
  const index = tasks.indexOf(task);
  tasks.splice(index, 1, newTask);
};

const deleteTask = async task => {
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
};

const deleteTasksById = async id => {
  tasks = tasks.filter(task => task.boardId !== id);
  return true;
};

const unassign = async id => {
  await tasks.forEach(task => {
    if (task.userId === id) {
      task.userId = null;
    }
  });
};

module.exports = {
  getAll,
  addTask,
  updateTask,
  deleteTask,
  deleteTasksById,
  unassign
};
