import { CustomError, ErrorCode } from './customError';
import httpStatus from 'http-status';

export class AuthServiceError extends CustomError {
  constructor(status: number, message: string, details?: Record<string, unknown>) {
    let errorCode: ErrorCode;
    
    switch (status) {
      case httpStatus.CONFLICT:
        errorCode = ErrorCode.RESOURCE_CONFLICT;
        break;
      case httpStatus.BAD_REQUEST:
        errorCode = ErrorCode.BAD_REQUEST;
        break;
      case httpStatus.UNAUTHORIZED:
        errorCode = ErrorCode.AUTHENTICATION_ERROR;
        break;
      default:
        errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
    }

    super(status, errorCode, message, details);
  }
} 