import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.string(),
  HOST: z.string(),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  LOG_LEVEL: z.string(),

  // Secrets
  PASSWORD_SECRET: z.string(),
  JWT_SECRET: z.string(),

  // API Keys
  RESEND_API_KEY: z.string(),

  // API URLs
  AUTH_API_URL: z.string(),
  AUTH_API_SUFFIX: z.string(),
  USER_API_URL: z.string(),
  USER_API_SUFFIX: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
