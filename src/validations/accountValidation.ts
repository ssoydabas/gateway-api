import { z } from 'zod';

import { registerInput } from '@/schemas/account/inputs/registerInput';
import { loginInput } from '@/schemas/account/inputs/loginInput';

const register = z.object({
  body: registerInput,
});

const login = z.object({
  body: loginInput,
});

const getEmailVerificationToken = z.object({
  query: z.object({
    email: z.string().email(),
  }),
});

const verifyEmail = z.object({
  query: z.object({
    token: z.string(),
  }),
});

const setResetPasswordToken = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const resetPassword = z.object({
  body: z.object({
    token: z.string(),
    password: z.string(),
    confirm_password: z.string(),
  }),
});

export default {
  register,
  login,
  getEmailVerificationToken,
  verifyEmail,
  setResetPasswordToken,
  resetPassword,
};
