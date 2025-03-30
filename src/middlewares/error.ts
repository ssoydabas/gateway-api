import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { nodeEnv } from '../constants';
import { log } from '@/utils/logger/logger';
import { CustomError } from '@/errors/customError';
import { AxiosError } from 'axios';

const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  // Handle CustomError
  if (err instanceof CustomError) {
    console.log('Custom Error');
    const response = err.toJSON();
    log.error('CUSTOM ERROR', err);
    res.status(err.status).json(response);
    return;
  }

  // Handle AxiosError
  if (err instanceof AxiosError) {
    console.log('Axios Error');
    const response = {
      ...err.response?.data,
    };
    log.error('AXIOS ERROR', err);
    res
      .status(err.response?.status || httpStatus.INTERNAL_SERVER_ERROR)
      .json(response);
    return;
  }

  // Handle other errors
  console.log('Other Errors');
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    code: 'INTERNAL_SERVER_ERROR',
    message:
      nodeEnv === 'production'
        ? httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
        : err.message,
    ...(nodeEnv === 'development' && { stack: err.stack }),
  };
  log.error('INTERNAL SERVER ERROR', err);
  res.status(statusCode).json(response);
};

export { errorHandler };
