const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const loginRouter = require('./resources/login/login.router');
const authorization = require('./middleware/authorization');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./middleware/logger');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const errorHandler = require('./middleware/errorHandler');
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const { originalUrl, query, body, method } = req;
  const q = JSON.stringify(query);
  const b = JSON.stringify(body);
  logger.info({ method, originalUrl, q, b });
  next();
});
app.use('/login', loginRouter);
app.use(authorization);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

// eslint-disable-next-line no-unused-vars
app.use(errorHandler);

module.exports = app;
