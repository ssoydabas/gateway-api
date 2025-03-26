import app from './app';
import { port } from './constants';
import { Server } from 'http';
import { log } from '@/utils/logger/logger';

const PORT = port;

let server: Server;

const startServer = () =>
  (server = app.listen(PORT, () => {
    log.info(`Listening to port ${PORT}`);
  }));

const exitHandler = () => {
  if (server)
    server.close(() => {
      log.info('Server closed');
      process.exit(1);
    });
  else process.exit(1);
};

const unexpectedErrorHandler = (error: Error) => {
  log.error('UNEXPECTED_ERROR', error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  log.info('SIGTERM received');
  if (server)
    server.close(() => {
      log.info('Server closed');
      process.exit(0);
    });
});

startServer();
