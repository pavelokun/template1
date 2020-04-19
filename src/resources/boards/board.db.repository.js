const Board = require('./board.model');
const createError = require('http-errors');
const getAll = async () => Board.find({});

const getBoard = async id => {
  return Board.findById(id);
};

const addBoard = async board => {
  if (!board.title || !board.columns) throw new createError.NotFound();
  return Board.create(board);
};

const updateBoard = async board => {
  const boardToUpdate = {
    ...board,
    columns: board.columns.map(col => ({ ...col, _id: col.id }))
  };
  return Board.updateOne({ _id: board.id }, boardToUpdate);
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).ok;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
