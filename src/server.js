const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./middleware/logger');
const { connectionToDB } = require('./db/db.client');
process.on('uncaughtExceptionMonitor', error => {
  logger.info(`Uncaught exception: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  logger.info(`Unhandled rejection: ${reason.message}`);
});
connectionToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
