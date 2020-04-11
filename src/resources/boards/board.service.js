const boardRepo = require('./board.memory.repository');
const { Board, Column } = require('./board.model');
const createError = require('http-errors');
const taskService = require('../tasks/task.service');
const getAll = async () => boardRepo.getAll();

const getById = async id => {
  const boards = await boardRepo.getAll();
  const board = boards.find(item => item.id === id);
  return board;
};

const addBoard = async body => {
  const columns = body.columns.map(column => {
    return new Column({
      title: column.title,
      order: column.order
    });
  });
  const newBoard = new Board({
    title: body.title,
    columns
  });
  await boardRepo.addBoard(newBoard);
  return newBoard;
};

const deleteBoard = async id => {
  const result = await boardRepo.deleteBoard(id);
  if (!result) {
    throw new createError.NotFound();
  } else {
    await taskService.deleteTasksById(id);
    return result;
  }
};

const updateBoard = async (board, body) => {
  body.columns.forEach(column => {
    if (!column.id) throw Error;
  });

  const newBoard = body;
  await boardRepo.updateBoard(board, newBoard);
  return newBoard;
};

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
