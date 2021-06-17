const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./logger');

dotenv.config();

let server;
mongoose.connect(process.env.MONGODB_URL).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(process.env.PORT || 3000, () => {
    logger.info(`Listening to port ${process.env.PORT || 3000}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
