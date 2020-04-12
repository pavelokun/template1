const usersRepo = require('./user.memory.repository');
const createError = require('http-errors');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = async id => {
  const user = await usersRepo.getUser(id);
  if (!user) {
    throw new createError.NotFound();
  } else {
    return user;
  }
};

const addUser = user => {
  if (user) {
    return usersRepo.addUser(user);
  }
  throw new createError.NotFound();
};

const updateUser = (user, body) => {
  const newUser = { ...user, ...body };
  usersRepo.updateUser(user, newUser);
  return newUser;
};

const deleteUser = async id => {
  const result = await usersRepo.deleteUser(id);
  if (!result) {
    throw new createError.NotFound();
  } else {
    await taskService.unassign(id);
    return result;
  }
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
