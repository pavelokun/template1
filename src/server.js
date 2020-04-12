const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./middleware/logger');

process.on('uncaughtExceptionMonitor', error => {
  logger.info(`Uncaught exception: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  logger.info(`Unhandled rejection: ${reason.message}`);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
