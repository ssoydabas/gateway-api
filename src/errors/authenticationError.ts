import { CustomError, ErrorCode } from './customError';
import httpStatus from 'http-status';

export class AuthenticationError extends CustomError {
  constructor(message: string = 'Authentication failed') {
    super(httpStatus.UNAUTHORIZED, ErrorCode.AUTHENTICATION_ERROR, message);
  }
}
