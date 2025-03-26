import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { nodeEnv } from '../constants';
import { log } from '@/utils/logger/logger';
import { CustomError } from '@/errors/customError';

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  // Handle CustomError
  if (err instanceof CustomError) {
    const response = err.toJSON();
    log.error('ERROR', err);
    res.status(err.status).json(response);
    return;
  }

  // Handle other errors
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    code: 'INTERNAL_SERVER_ERROR',
    message:
      nodeEnv === 'production'
        ? httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
        : err.message,
    ...(nodeEnv === 'development' && { stack: err.stack }),
  };
  log.error('ERROR', err);
  res.status(statusCode).json(response);
};

export { errorHandler };
