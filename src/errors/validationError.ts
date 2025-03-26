import { CustomError, ErrorCode } from './customError';
import httpStatus from 'http-status';

export class ValidationError extends CustomError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(httpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR, message, details);
  }
}
