const User = require('./user.model');

const getAll = async () => User.find({});

const getUser = async id => User.findById(id);

const addUser = async user => User.create(user);

const updateUser = async userToUpdate => {
  return (await User.updateOne({ _id: userToUpdate.id }, userToUpdate)).ok
    ? userToUpdate
    : null;
};

const deleteUser = async id => (await User.deleteOne({ _id: id })).deletedCount;

const getUserByLogin = async login => User.findOne({ login });

module.exports = {
  getAll,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserByLogin
};
