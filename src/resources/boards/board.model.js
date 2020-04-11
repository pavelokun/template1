const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Column', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id = uuid(), title = 'Board', columns = [] }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = { Board, Column };
