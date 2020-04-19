const boardRepo = require('./board.db.repository');
const createError = require('http-errors');
const taskService = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();

const getBoard = async id => {
  const board = await boardRepo.getBoard(id);
  if (board) return board;
  throw new createError.NotFound();
};

const addBoard = board => boardRepo.addBoard(board);

const updateBoard = async board => {
  const result = await boardRepo.updateBoard(board);
  if (!result) {
    throw new createError.NotFound();
  }
  return board;
};

const deleteBoard = async id => {
  const result = await boardRepo.deleteBoard(id);
  if (result) taskService.deleteTasks(id);
  return result;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
