export type LogPayload = Record<string, unknown>;

export interface LogContext {
  requestId: string;
  correlationId?: string;
  userId?: string;
  source?: 'web' | 'mobile' | 'api';
  statusCode?: number;
  caller?: string;
}

export interface ErrorLog {
  message: string;
  payload?: LogPayload;
  error?: {
    message?: string;
    stack?: string;
    name?: string;
    raw?: unknown;
  };
}
