const { Board, Column } = require('./board.model');
// const deleteTasksById = require('../tasks/task.memory.repository');
const boards = [
  new Board({
    id: '1',
    columns: [new Column({ id: '1' })]
  })
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return boards;
};

const addBoard = board => boards.push(board);

const updateBoard = async (board, newBoard) => {
  const index = boards.indexOf(board);
  boards.splice(index, 1, newBoard);
};

const deleteBoard = async id => {
  const index = boards.findIndex(board => board.id === id);
  if (index === -1) return false;
  await boards.splice(index, 1);
  return true;
};

module.exports = { getAll, addBoard, updateBoard, deleteBoard };
