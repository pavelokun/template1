const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [
      {
        title: String,
        order: Number,
        _id: {
          type: String,
          default: uuid
        }
      }
    ]
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title } = board;
  const obj = {
    id,
    title,
    columns: []
  };
  for (const column of board.columns) {
    /* eslint-disable-next-line no-shadow */
    const { id, title, order } = column;
    obj.columns.push({ id, title, order });
  }
  return obj;
};

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
