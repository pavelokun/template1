// const usersRepo = require('./user.memory.repository');
const usersRepo = require('./user.db.repository');

const createError = require('http-errors');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = async id => {
  const user = await usersRepo.getUser(id);
  if (user) {
    return user;
  }
  throw new createError.NotFound();
};

const addUser = user => {
  if (user) {
    return usersRepo.addUser(user);
  }
  throw new createError.NotFound();
};

const updateUser = async body => {
  if (!body.name || !body.login || !body.password) return;
  const updatedUser = await usersRepo.updateUser(body);
  if (updateUser) {
    return updatedUser;
  }
  throw new createError.BadRequest();
};

const deleteUser = async id => {
  const result = await usersRepo.deleteUser(id);
  if (!result) {
    throw new createError.NotFound();
  } else {
    await taskService.unassignTasks(id);
    return result;
  }
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
