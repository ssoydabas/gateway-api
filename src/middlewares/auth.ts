import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { CustomError, ErrorCode } from '@/errors/customError';

const authorizationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    throw new CustomError(
      httpStatus.UNAUTHORIZED,
      ErrorCode.AUTHORIZATION_ERROR,
      'Authorization header is required',
    );

  if (!authHeader.startsWith('Bearer '))
    throw new CustomError(
      httpStatus.UNAUTHORIZED,
      ErrorCode.AUTHORIZATION_ERROR,
      'Invalid authorization format. Use Bearer token',
    );

  next();
};

export default authorizationMiddleware;
