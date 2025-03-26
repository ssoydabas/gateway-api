import jwt from 'jsonwebtoken';
import { jwtSecret } from '@/constants';

export const decodeJwtToken = (token: string): string | null => {
  try {
    return jwt.verify(token, jwtSecret) as string;
  } catch (error) {
    return null;
  }
};
