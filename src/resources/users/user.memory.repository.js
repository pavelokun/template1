const User = require('./user.model');
// const unassign = require('../tasks/task.memory.repository');

const users = [
  new User({
    id: '1',
    name: 'John',
    login: 'john',
    password: 'pass'
  })
];

const getAll = async () => {
  return users;
};

const getUser = async id => {
  return users.find(user => user.id === id);
};

const addUser = async user => {
  const newUser = new User(user);
  await users.push(newUser);
  return newUser;
};

const updateUser = async (user, newUser) => {
  const index = users.indexOf(user);
  users.splice(index, 1, newUser);
};

const deleteUser = async id => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return false;
  await users.splice(index, 1);
  return true;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
