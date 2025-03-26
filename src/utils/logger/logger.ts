import pino from 'pino';
import { options } from './options';
import { LogPayload, LogContext, ErrorLog } from './types';

export const logger = pino(options);

export const log = {
  debug: (message: string, payload?: LogPayload, context?: LogContext) => {
    logger.debug({
      message,
      ...(context && { context }),
      ...(payload && { payload }),
    });
  },
  info: (message: string, payload?: LogPayload, context?: LogContext) => {
    logger.info({
      message,
      ...(context && { context }),
      ...(payload && { payload }),
    });
  },
  warn: (message: string, payload?: LogPayload, context?: LogContext) => {
    logger.warn({
      message,
      ...(context && { context }),
      ...(payload && { payload }),
    });
  },
  error: (
    message: string,
    error?: Error | unknown,
    payload?: LogPayload,
    context?: LogContext,
  ) => {
    let errorDetails: any = {
      type: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };

    const logEntry: ErrorLog = {
      message,
      error: errorDetails,
      ...(payload && { payload }),
      ...(context && { context }),
    };

    logger.error(logEntry);
  },
};
