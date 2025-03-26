import env from './config';

// Node Config
export const nodeEnv = env.NODE_ENV;
export const logLevel = env.LOG_LEVEL || 'info';

// App Config
export const port = env.PORT;

// Secrets
export const passwordSecret = env.PASSWORD_SECRET;
export const jwtSecret = env.JWT_SECRET;

// API Keys
export const resendApiKey = env.RESEND_API_KEY;

// Allowed Origins
export const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:4000',
  'http://localhost:4001',
  'http://localhost:4002',
  'http://localhost:4003',
];

// API URLs
export const authApiUrl = env.AUTH_API_URL;
export const authApiSuffix = env.AUTH_API_SUFFIX;

export const userApiUrl = env.USER_API_URL;
export const userApiSuffix = env.USER_API_SUFFIX;
